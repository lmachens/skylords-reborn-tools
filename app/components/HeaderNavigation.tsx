import Link from "next/link";
import styles from "../styles/HeaderNavigation.module.css";

const HeaderNavigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a>Stats</a>
        </Link>
        <Link href="/leaderboards">
          <a>Leaderboards</a>
        </Link>
      </nav>
    </header>
  );
};

export default HeaderNavigation;
