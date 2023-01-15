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
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fectchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );
  const exceptData = data ?? [];
  /* let chartData = null;
  if (Array.isArray(data)) {
    chartData = exceptData?.map((i) => {
      return {
        x: i.time_close,
        y: [i.open, i.high, i.low, i.close] ?? [],
      };
    });
  } */

  return (
    <div>
      {isLoading ? (
        "Loaidng chart..."
      ) : (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "Prices",
                data: exceptData?.map((price) => parseInt(price.close)),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 480,
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
              colors: ["#e74c3c"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value}`,
                },
              },
            }}
          />
          {/* <ApexChart
            type="candlestick"
            series={[
              {
                data: chartData,
              },
            ]}
          /> */}
        </div>
      )}
    </div>
  );
}

export default Chart;
