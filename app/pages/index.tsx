import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useMemo, useState } from "react";
import { getStats } from "../lib/api";
import Chart from "../components/Chart";

const endpoints = [
  "accounts",
  "sessions",
  "matches",
  "matches/1v1",
  "matches/2v2",
  "matches/1pve",
  "matches/2pve",
  "matches/4pve",
  "matches/12pve",
  "quests/active",
  "auctions",
  "cards",
  "upgrades",
  "boosters",
  "mails",
  "decks",
  "transactions",
  "experience",
  "elo",
  "bfp",
  "gold",
];

const Home = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  const seriesList = useMemo(
    () =>
      endpoints.map((endpoint) => [
        {
          name: endpoint[0].toUpperCase() + endpoint.slice(1),
          data: stats.map((item) => [item.timestamp, item[endpoint].count]),
        },
      ]),
    [stats]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Skylords Reborn Tools - Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {seriesList.map((series) => (
        <Chart series={series} title={series[0].name} />
      ))}
    </div>
  );
};

export default Home;
