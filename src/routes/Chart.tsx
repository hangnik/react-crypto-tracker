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

  let exceptData = data ?? [];
  if ("error" in exceptData) {
    exceptData = [];
  }

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
                height: 500,
                width: 300,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 2,
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
                tooltip: {
                  enabled: false,
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
          <ApexChart
            type="candlestick"
            series={[
              {
                name: "시세",
                data: exceptData?.map((price) => ({
                  x: price.time_close * 1000,
                  y: [price.open, price.high, price.low, price.close],
                })),
              },
            ]}
            width="100%"
            height="160px"
            options={{
              noData: {
                text: "",
              },
              fill: {
                opacity: 0,
              },
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
                fontFamily: '"Pretendard", sans-serif',
                width: 500,
                height: 300,
              },
              grid: {
                show: false,
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
              xaxis: {
                labels: {
                  show: false,
                },
                type: "datetime",
                categories: exceptData?.map((price) => price.time_close * 1000),
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              stroke: {
                width: 2,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Chart;
