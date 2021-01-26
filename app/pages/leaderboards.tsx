import MaterialTable from "material-table";
import Head from "next/head";
import { useEffect, useState } from "react";
import PlayerDetails from "../components/PlayerDetails";
import tableIcons from "../components/tableIcons";
import { getLeaderboard, LeaderboardResult } from "../lib/api";
import styles from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardResult>([]);

  useEffect(() => {
    getLeaderboard().then(setLeaderboard);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Skylords Reborn Tools - Rankings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MaterialTable
        columns={[
          { title: "Name", field: "name" },
          { title: "Rating", field: "rating", defaultSort: "desc" },
          { title: "Activity", field: "activity", type: "numeric" },
          { title: "Wins", field: "wins", type: "numeric" },
          { title: "Losses", field: "losses", type: "numeric" },
        ]}
        detailPanel={(ranking) => <PlayerDetails ranking={ranking} />}
        options={{
          pageSize: 10,
        }}
        data={leaderboard}
        title="Leaderboard PVP 1v1"
        icons={tableIcons}
      />
    </div>
  );
};

export default Leaderboard;
