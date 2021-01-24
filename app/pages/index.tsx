import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { getStats } from "../lib/api";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Home = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  const sessions = [
    {
      data: stats.map((item) => [item.timestamp, item.sessions.count]),
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Skylords Reborn Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReactApexChart options={{}} series={sessions} type="area" width="500" />
    </div>
  );
};

export default Home;
