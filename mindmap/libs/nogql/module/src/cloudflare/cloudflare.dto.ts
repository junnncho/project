export type DnsInput = {
  name: string;
  type: string;
  content: string;
};
export type Dns = DnsInput & {
  id: string;
};
