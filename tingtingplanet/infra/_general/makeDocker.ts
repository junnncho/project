import * as fs from "fs";
type Dependency = {
  source: string;
  target: string;
  type: string;
};
const deploy = async () => {
  const DEPLOY_APPS = process.env.DEPLOY_APPS;
  if (!DEPLOY_APPS) throw new Error("DEPLOY_APPS not set");
  const apps = DEPLOY_APPS.split(",");
  const data = JSON.parse(fs.readFileSync("dist/graph.json").toString("utf-8"));
  const dependencyProto: { [key: string]: Dependency[] } = data.graph.dependencies;
  const nodes = Object.keys(dependencyProto);
  const dependencyMap = new Map<string, string[]>();
  nodes.forEach((node) => {
    let affecteds: string[] = [node];
    do {
      affecteds = nodes.filter((n) => dependencyProto[n].some((d) => affecteds.includes(d.target)));
      affecteds.forEach((affected) =>
        dependencyMap.set(affected, [...new Set([...(dependencyMap.get(affected) ?? []), node])])
      );
    } while (affecteds.length > 0);
  });
  const excludeLibs: string[] = [ "shared/test-server", "shared/test-client"];
  const layers = apps.map((name) => ({
    name,
    layers:
      dependencyMap
        .get(name)
        ?.filter((lib) => !excludeLibs.includes(lib))
        .sort((a, b) =>
          dependencyMap.get(b)?.includes(a) ? -1 : dependencyMap.get(a)?.includes(b) ? 1 : a.localeCompare(b)
        ) ?? [],
  }));
  const packageMap = new Map<string, string>();
  const libs = [...new Set(layers.reduce((acc, cur) => [...acc, ...cur.layers], [] as string[]))];
  const excludeDeps = [
    ...[...excludeLibs, ...libs].map((lib) => `@${lib}`),
    ...[...excludeLibs, ...libs].map((lib) => `@tingting/${lib}`),
  ];
  libs.forEach((lib) => {
    const packDeps = JSON.parse(fs.readFileSync(`dist/libs/${lib}/package.json`).toString("utf-8"));
    const deps = Object.entries({
      ...packDeps.dependencies,
      ...(packDeps.peerDependencies ?? {}),
    })
      .filter(([k, v]: any) => !excludeDeps.includes(k))
      .map(([k, v]: any) => `${k}@${v}`)
      .join(" ");
    packageMap.set(lib, deps);
  });
  const dockers = layers.map((layer) => ({
    name: layer.name,
    dockerfile: `
FROM node:18.14.0-alpine
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN apk --no-cache add git
RUN mkdir -p /workspace
WORKDIR /workspace
${layer.layers
  .map(
    (lib) => `
# ${lib} dependency install
${packageMap.get(lib)?.length ? `RUN npx pnpm i --prod ${packageMap.get(lib)}` : "# empty deps"}
`
  )
  .join("")}
# ${layer.name} app dependency install
COPY ./package.json ./package.json
RUN npx pnpm i --prod

COPY . .
ENV PORT ${layer.name.includes("backend") ? "8080" : "4200"}
CMD ${layer.name.includes("backend") ? `["node", "main.js", "--max-old-space-size=8192"]` : "npm start"}
`,
  }));
  for (const dockerfile of dockers) {
    fs.writeFileSync(`dist/apps/${dockerfile.name}/Dockerfile`, dockerfile.dockerfile);
    fs.writeFileSync(`dist/apps/${dockerfile.name}/.dockerignore`, `.next/cache`);
  }
};
deploy();
