import MaterialTable from "material-table";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import PlayerDetails from "../components/PlayerDetails";
import tableIcons from "../components/tableIcons";
import { getLeaderboard, LeaderboardResult } from "../lib/api";
import styles from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardResult>([]);
  const router = useRouter();
  const mode = router.query.mode || "1v1";

  useEffect(() => {
    getLeaderboard(mode).then(setLeaderboard);
  }, [mode]);

  console.log({ leaderboard });
  return (
    <div className={styles.container}>
      <Head>
        <title>Skylords Reborn Tools - Rankings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <select
        value={mode}
        onChange={(event) =>
          router.push(`/leaderboards?mode=${event.target.value}`)
        }
      >
        <option value="1v1">PVP 1v1</option>
        <option value="2v2">PVP 2v2</option>
      </select>
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
        title={`Leaderboard PVP ${mode}`}
        icons={tableIcons}
      />
    </div>
  );
};

export default Leaderboard;
