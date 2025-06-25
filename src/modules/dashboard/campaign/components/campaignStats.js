"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'


const chartConfig = {
  pending: {
    label: "Pending Messages",
    color: "hsl(var(--chart-1))",
  },
  sent: {
    label: "Sent Messages",
    color: "hsl(var(--chart-2))",
  },
  delivered: {
    label: "Delivered Messages",
    color: "hsl(var(--chart-3))",
  },
  read: {
    label: "Read Messages",
    color: "hsl(var(--chart-4))",
  },
  failed: {
    label: "Failed Messages",
    color: "hsl(var(--chart-5))",
  },
};

export default function CampaignStats({pending, sent, delivered, read, failed}) {
const chartData = [
  { status: "pending", msgCount: pending, fill: "#4285F4" },   // Blue
  { status: "sent", msgCount: sent, fill: "#FFB300" },   // Amber
  { status: "delivered", msgCount: delivered, fill: "#FF7043" },  // Orange
  { status: "read", msgCount: read, fill: "#0F9D58" },     // Green
  { status: "failed", msgCount: failed, fill: "#9E9E9E" },     // Grey
];
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="msgCount" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
