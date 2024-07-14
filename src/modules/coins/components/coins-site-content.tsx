"use client";

import { useEffect, useState } from "react";
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { currencyFormatter } from "~/lib/utils";
import { CoinsChart } from "./coins-chart";
import { GraphData, PriceData, PythCoinsEnum } from "../types";
import items from "../data/crypto-coins";
import { extractPriceValue, getPriceFeed } from "../utils/parsers";

const initialPricesValues = {
  btc: 0,
  eth: 0,
  usdc: 0,
  dai: 0,
  aud: 0,
};

function App() {
  const [openGraph, setOpenGraph] = useState("");
  const [pythPrices, setPythPrices] = useState<PriceData>(initialPricesValues);
  const [chainlinkPrices, setChainlinkPrices] =
    useState<PriceData>(initialPricesValues);
  const [priceHistory, setPriceHistory] = useState<GraphData[]>([]);

  useEffect(() => {
    async function fetchData() {
      // use the new pyth oracle model
      const connection = new PriceServiceConnection(
        "https://hermes.pyth.network",
        {
          priceFeedRequestConfig: {
            binary: true,
          },
        },
      );

      const priceIds = [
        "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
        "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
        "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
        "0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd",
        "0x67a6f93030420c1c9e3fe37c1ab6b77966af82f995944a9fefce357a22854a80",
      ];

      const currentPrices = await connection.getLatestPriceFeeds(priceIds);
      let pythValues = initialPricesValues;
      if (currentPrices) {
        pythValues = {
          btc: extractPriceValue(PythCoinsEnum.BTC, currentPrices),
          eth: extractPriceValue(PythCoinsEnum.ETH, currentPrices),
          usdc: extractPriceValue(PythCoinsEnum.USDC, currentPrices),
          dai: extractPriceValue(PythCoinsEnum.DAI, currentPrices),
          aud: extractPriceValue(PythCoinsEnum.AUD, currentPrices),
        };
        setPythPrices(pythValues);
      }

      // Fetch Chainlink data
      const btcAddr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
      const ethAddr = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
      const usdcAddr = "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E";
      const daiAddr = "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19";
      const audAddr = "0xB0C712f98daE15264c8E26132BCC91C40aD4d5F9";

      const response = await Promise.all([
        getPriceFeed(btcAddr).methods.latestRoundData().call(),
        getPriceFeed(ethAddr).methods.latestRoundData().call(),
        getPriceFeed(usdcAddr).methods.latestRoundData().call(),
        getPriceFeed(daiAddr).methods.latestRoundData().call(),
        getPriceFeed(audAddr).methods.latestRoundData().call(),
      ]);

      let chainlinkValues = initialPricesValues;
      chainlinkValues = {
        btc: Number(response[PythCoinsEnum.BTC].answer) / 1e8,
        eth: Number(response[PythCoinsEnum.ETH].answer) / 1e8,
        usdc: Number(response[PythCoinsEnum.USDC].answer) / 1e8,
        dai: Number(response[PythCoinsEnum.DAI].answer) / 1e8,
        aud: Number(response[PythCoinsEnum.AUD].answer) / 1e8,
      };
      setChainlinkPrices(chainlinkValues);

      // Update price history
      const now = Date.now();
      setPriceHistory((prevHistory) => [
        ...prevHistory.slice(-19),
        {
          time: now,
          btc: (pythValues.btc + chainlinkPrices.btc) / 2,
          eth: (pythValues.eth + chainlinkPrices.eth) / 2,
          usdc: (pythValues.usdc + chainlinkPrices.usdc) / 2,
          dai: (pythValues.dai + chainlinkPrices.dai) / 2,
          aud: (pythValues.aud + chainlinkPrices.aud) / 2,
        },
      ]);
    }

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <table className="mb-14 w-full table-auto border-collapse">
        <thead>
          <tr className="bg-muted text-muted-foreground">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-right">Current Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((coin, index) => {
            const average =
              (pythPrices[coin.priceKey] + chainlinkPrices[coin.priceKey]) / 2;
            return (
              <>
                <tr
                  key={`row-item-${index}`}
                  className="cursor-pointer border-b transition-colors hover:bg-accent"
                  onClick={() => {
                    setOpenGraph((prevItem) =>
                      prevItem === coin.priceKey ? "" : coin.priceKey,
                    );
                  }}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="flex flex-row items-center gap-2 px-4 py-2">
                    <img className="h-4 w-4" src={coin.icon} />
                    {coin.title}
                  </td>
                  <td className="px-4 py-2">{coin.symbol}</td>
                  <td className="px-4 py-2 text-right">
                    {currencyFormatter.format(average)}
                  </td>
                </tr>
                {openGraph === coin.priceKey && (
                  <tr className="w-full">
                    <td colspan="100%">
                      <CoinsChart chartData={priceHistory} />
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
