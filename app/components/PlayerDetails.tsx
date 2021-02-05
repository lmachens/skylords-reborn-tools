import { useEffect, useMemo, useState } from "react";
import { getPlayerDetails, RankingResult } from "../lib/api";
import Chart from "./Chart";
import styles from "../styles/PlayerDetails.module.css";
import { useRouter } from "next/router";

type Props = {
  ranking: RankingResult;
};

const PlayerDetails = ({ ranking }: Props) => {
  const [details, setDetails] = useState([]);
  const router = useRouter();
  const mode = router.query.mode || "1v1";

  useEffect(() => {
    getPlayerDetails(mode, ranking.name).then(setDetails);
  }, []);

  const ratingSeries = useMemo(
    () => [
      {
        name: "Rating",
        data: details.map((item) => [item.timestamp, item.rating]),
      },
    ],
    [details]
  );
  const winsLossesSeries = useMemo(
    () => [
      {
        name: "Wins",
        data: details.map((item) => [item.timestamp, item.wins]),
      },
      {
        name: "Losses",
        data: details.map((item) => [item.timestamp, item.losses]),
      },
    ],
    [details]
  );
  const activitySeries = useMemo(
    () => [
      {
        name: "Activity",
        data: details.map((item) => [item.timestamp, item.activity]),
      },
    ],
    [details]
  );
  return (
    <div className={styles.container}>
      <Chart title="Rating" series={ratingSeries} />
      <Chart title="Wins/Losses" series={winsLossesSeries} />
      <Chart title="Activity" series={activitySeries} />
    </div>
  );
};

export default PlayerDetails;
