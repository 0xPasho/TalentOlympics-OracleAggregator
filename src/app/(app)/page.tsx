import { Metadata } from "next";
import CoinsSiteContent from "~/modules/coins/components/coins-site-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Solana (SOL) Blockchain Explorer",
  description: "Solana (SOL) Blockchain Explorer",
};

export default function HomePage() {
  return (
    <>
      <div className="container:px-0 mx-auto max-w-container px-4">
        <CoinsSiteContent />
      </div>
    </>
  );
}
