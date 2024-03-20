import { AxiosInstance } from "axios";
import { CloudflareOptions } from "../option";
import { Dns, DnsInput } from "./cloudflare.dto";
import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "@shared/util-server";
import { webcrypto } from "crypto";

@Injectable()
export class CloudflareService extends LogService {
  constructor(
    @Inject("CLOUDFLARE_OPTIONS") private options: CloudflareOptions,
    @Inject("CLOUDFLARE_API") private api: AxiosInstance,
    @Inject("CLOUDFLARE_TURNSTILE") private turnstile: AxiosInstance
  ) {
    super(CloudflareService.name);
  }
  async getDnsZones() {
    return await this.api.get(`/zones`);
  }
  async applyDnsRecords(zoneId: string, records: DnsInput[]) {
    const existings: Dns[] = (await this.api.get(`/zones/${zoneId}/dns_records?per_page=5000`)).data.result;
    const toCreate = records.filter((r) => !existings.find((er) => er.name === r.name));
    const toUpdate = existings.filter((er) => records.find((r) => er.name === r.name && er.content !== r.content));
    for (const record of toCreate)
      await this.api.post(`/zones/${zoneId}/dns_records`, {
        ...record,
        ttl: 1,
      });
    for (const record of toUpdate)
      await this.api.put(`/zones/${zoneId}/dns_records/${record.id}`, {
        ...record,
        ttl: 1,
      });
    this.logger.log(`${toCreate.length} records created, ${toUpdate.length} records updated`);
    return true;
  }
  async deleteDnsRecords(zoneId: string, records: DnsInput[]) {
    const existings: Dns[] = (await this.api.get(`/zones/${zoneId}/dns_records?per_page=5000`)).data.result;
    const toDelete = existings.filter((er) => records.find((r) => er.name === r.name && er.content === r.content));
    for (const record of toDelete) await this.api.delete(`/zones/${zoneId}/dns_records/${record.id}`);
    return true;
  }
  async createSignedUrlToken(videoUid: string, expireTimeMs: number) {
    const { id: keyId, jwk: jwkKey }: { id: string; jwk: string } = (
      await this.api.post(`/accounts/${this.options.accountId}/stream/keys`)
    ).data.result;
    const encoder = new TextEncoder();
    const expiresIn = Math.floor(Date.now() / 1000) + Math.floor(expireTimeMs / 1000);
    const headers = { alg: "RS256", kid: keyId };
    const data = { sub: videoUid, kid: keyId, exp: expiresIn, accessRules: [] };
    const token = `${objectToBase64url(headers)}.${objectToBase64url(data)}`;
    const jwk = JSON.parse(Buffer.from(jwkKey, "base64").toString("binary"));
    const key = await webcrypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, [
      "sign",
    ]);
    const signature = await webcrypto.subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, key, encoder.encode(token));
    const signedToken = `${token}.${arrayBufferToBase64Url(signature)}`;
    return signedToken;
  }
  async isVerified(token: string) {
    return (
      await this.turnstile.post(`/siteverify`, {
        secret: this.options.turnstileSecret,
        response: token,
      })
    ).data.success;
  }
}
// Utilities functions
const arrayBufferToBase64Url = (buffer: ArrayBuffer) => {
  const asc = String.fromCharCode(...new Uint8Array(buffer));
  return Buffer.from(asc, "binary").toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

const objectToBase64url = (payload: object) => {
  return arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
};
