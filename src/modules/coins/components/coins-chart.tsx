"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartConfig = {
  btc: {
    label: "BTC/USD",
    color: "hsl(var(--chart-1))",
  },
  eth: {
    label: "ETH/USD",
    color: "hsl(var(--chart-2))",
  },
  usdc: {
    label: "USDC/USD",
    color: "hsl(var(--chart-3))",
  },
  dai: {
    label: "DAI/USD",
    color: "hsl(var(--chart-4))",
  },
  aud: {
    label: "AUD/USD",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function CoinsChart({ chartData }: { chartData: any[] }) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        className="max-h-[300px]"
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          strokeWidth={2}
          dot={false}
          dataKey="btc"
          stroke="hsl(var(--chart-1))"
        />
        <Line
          strokeWidth={2}
          dot={false}
          dataKey="eth"
          stroke="hsl(var(--chart-2))"
        />
        <Line
          strokeWidth={2}
          dot={false}
          dataKey="usdc"
          stroke="hsl(var(--chart-3))"
        />
        <Line
          strokeWidth={2}
          dot={false}
          dataKey="dai"
          stroke="hsl(var(--chart-4))"
        />
        <Line
          strokeWidth={2}
          dot={false}
          dataKey="aud"
          stroke="hsl(var(--chart-5))"
        />
      </LineChart>
    </ChartContainer>
  );
}
