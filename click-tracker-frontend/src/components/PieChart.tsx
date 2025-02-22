import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, datasets }: { labels: string[]; datasets: any[] }) {
  const data = { labels, datasets };
  return <Pie data={data} />;
}
