import { PriceData } from "./Coin";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiOutlineMinus,
} from "react-icons/hi2";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const OverView = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const OverViewItem = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  padding: 15px;
`;

const Label = styled.div`
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.titleColor};
`;

function PriceValue({ value, className }: PriceValueProps) {
  return (
    <div className={className}>
      <span>{value.toFixed(1)}%</span>
      <span>
        {value > 0 ? (
          <HiArrowTrendingUp />
        ) : value === 0 ? (
          <HiOutlineMinus />
        ) : (
          <HiArrowTrendingDown />
        )}
      </span>
    </div>
  );
}

const PriceValueStyled = styled(PriceValue)<{ value: number }>`
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  color: ${(props) =>
    props.value > 0
      ? props.theme.upArrowColor
      : props.value === 0
      ? props.theme.flatArrowColor
      : props.theme.downArrowColor};
  svg {
    color: ${(props) =>
      props.value > 0
        ? props.theme.upArrowColor
        : props.value === 0
        ? props.theme.flatArrowColor
        : props.theme.downArrowColor};
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface PriceValueProps {
  className?: string;
  value: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <Container>
      {isLoading ? (
        <Loader> "Loading Prcie..." </Loader>
      ) : (
        <OverView>
          <OverViewItem>
            <Label>From 1h ago</Label>
            <PriceValueStyled
              value={data?.quotes.USD.percent_change_1h as number}
            />
          </OverViewItem>
          <OverViewItem>
            <Label>From 6h ago</Label>
            <PriceValueStyled
              value={data?.quotes.USD.percent_change_6h as number}
            />
          </OverViewItem>
          <OverViewItem>
            <Label>From 12h ago</Label>
            <PriceValueStyled
              value={data?.quotes.USD.percent_change_12h as number}
            />
          </OverViewItem>
          <OverViewItem>
            <Label>From 24h ago</Label>
            <PriceValueStyled
              value={data?.quotes.USD.percent_change_24h as number}
            />
          </OverViewItem>
          <OverViewItem>
            <Label>From 7d ago</Label>
            <PriceValueStyled
              value={data?.quotes.USD.percent_change_7d as number}
            />
          </OverViewItem>
          <OverViewItem>
            <Label>From 30d ago</Label>
            <PriceValueStyled
              value={data?.quotes.USD.percent_change_30d as number}
            />
          </OverViewItem>
        </OverView>
      )}
    </Container>
  );
}

export default Price;
