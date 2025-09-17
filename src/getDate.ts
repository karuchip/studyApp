export default function formatDateWithDay(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので +1
  const date = String(today.getDate()).padStart(2, "0");

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const day = weekdays[today.getDay()];

  return `${year}/${month}/${date} (${day})`;
}

