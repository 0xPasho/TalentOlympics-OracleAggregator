export interface PriceData {
  btc: number;
  eth: number;
  usdc: number;
  dai: number;
  aud: number;
}

export enum PythCoinsEnum {
  BTC,
  ETH,
  USDC,
  DAI,
  AUD,
}

export interface ItemsKey {
  title: string;
  symbol: string;
  priceKey: string;
  icon: string;
}

export interface GraphData {
  time: number;
  btc: number;
  eth: number;
  usdc: number;
  dai: number;
  aud: number;
}
