import { useQuery } from "react-query";
import { fectchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fectchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loaidng chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Prices",
              data: data?.map((price) => parseInt(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: { show: false },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
              axisTicks: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["green"],
                stops: [0, 100],
              },
            },
            colors: ["yellow"],
            tooltip: {
              y: {
                formatter: (value) => `$${value}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
