import { createContext, useContext } from "react";

export class LightningStore {
  restEndpoint: string | undefined;
  adminMacaroon: string | undefined;

  constructor() { 
    console.log('constructed')
  }

  async initialize(restEndpoint: string, adminMacaroon: string) {
    this.restEndpoint = restEndpoint;
    this.adminMacaroon = adminMacaroon;
  };

  async addPeer(connectionString: string): Promise<string> {
    console.log("Added peer with connection string");
    return 'Peer'
  }

  async openChannel(pubkey: string, amount: number): Promise<string> {
    console.log("Open Channel");
    return "channelId";
  }

  async mineBlock(count: number = 1): Promise<string>  {
    return `${count} blocks mined.`;
  }

  async generateInvoice(amount: number, memo: string): Promise<string>  {
    console.log('invoice: lnbc...');
    return 'lnbcasdfksjdf';
  }

  async payInvoice(paymentRequest: string): Promise<string>  {
    console.log('invoice paid!');
    return 'invoice paid!';
  }

}

export const LightningStoreContext = createContext<LightningStore>(new LightningStore());
export const useLightning = () => useContext(LightningStoreContext);