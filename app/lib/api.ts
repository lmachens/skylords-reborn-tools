type Stats = {
  [key: string]: {
    count: number;
  };
}[];
export const getStats = async () => {
  const response = await fetch(`/api/stats`);
  return (await response.json()) as Stats;
};
