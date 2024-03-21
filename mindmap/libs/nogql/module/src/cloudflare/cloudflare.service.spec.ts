// import { CloudflareService } from "./cloudflare.service";
import { TestSystem } from '@nogql/test-server';
import { Utils } from '@nogql/util';

describe('Cloudflare Service', () => {
  const system = new TestSystem();
  // let cloudflareService: CloudflareService;
  beforeAll(async () => {
    // const app = await system.init(registerModules(environment));
    // cloudflareService = app.get<CloudflareService>(CloudflareService);
  });
  afterAll(async () => await system.terminate());
  it('DNS', async () => {
    await Utils.sleep(100);
  });
  // it("Create Cloudflare", async () => {
  //   input = sample.cloudflareInput(board._id, user._id);
  //   cloudflare = await cloudflareService.create(input);
  //   expect(cloudflare.status).toEqual("active");
  //   expect(cloudflare.title).toEqual(input.title);
  // });
  // it("Update Cloudflare", async () => {
  //   input = sample.cloudflareInput(board._id, user._id);
  //   cloudflare = await cloudflareService.update(cloudflare._id, input);
  //   expect(cloudflare.status).toEqual("active");
  //   expect(cloudflare.title).toEqual(input.title);
  // });
  // it("Create comment with cloudflare", async () => {
  //   comment = await commentService.create(sample.commentInput(cloudflare._id, user._id));
  //   expect(comment.status).toEqual("active");
  // });
  // it("Create subComment with cloudflare", async () => {
  //   const subComment = await commentService.create(sample.commentInput(cloudflare._id, user._id, comment._id));
  //   expect(subComment.status).toEqual("active");
  // });
  // it("Unable to create subComment in cloudflare with policy", async () => {
  //   await cloudflare.merge({ policy: ["noSubComment"] }).save();
  //   await expect(commentService.create(sample.commentInput(cloudflare._id, user._id, comment._id))).rejects.toThrow();
  // });
  // it("Unable to create comment in cloudflare with policy", async () => {
  //   await cloudflare.merge({ policy: ["noComment", "noSubComment"] }).save();
  //   await expect(commentService.create(sample.commentInput(cloudflare._id, user._id))).rejects.toThrow();
  // });
  // it("Remove Cloudflare", async () => {
  //   cloudflare = await cloudflareService.remove(cloudflare._id);
  //   expect(cloudflare.status).toEqual("inactive");
  // });
  // it("Unable to create comment with removed cloudflare", async () => {
  //   await cloudflare.merge({ policy: [] }).save();
  //   await cloudflareService.remove(cloudflare._id);
  //   await expect(commentService.create(sample.commentInput(cloudflare._id, user._id))).rejects.toThrow();
  // });
});
