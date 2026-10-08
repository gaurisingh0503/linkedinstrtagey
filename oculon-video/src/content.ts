// Brief-provided labels only. Repeat labels to represent the category totals.
export const categories = [
  {
    name: "Comparisons",
    count: 7,
    labels: [
      "Scenario Comparison",
      "Plan Differences",
      "What-If Analysis",
      "Period Comparison",
    ],
  },
  {
    name: "Scenario Controls",
    count: 6,
    labels: [
      "Scenario Locks",
      "Merge Changes",
      "Merge Direction",
      "Scenario Permissions",
    ],
  },
  { name: "Shared Dimensions", count: 5, labels: ["Shared Dimensions"] },
  {
    name: "Database Queries",
    count: 4,
    labels: ["Database Queries", "Data Freshness", "Sync Status"],
  },
  {
    name: "Model Grid & Editing",
    count: 5,
    labels: ["Model Grid", "Drag and Drop"],
  },
  {
    name: "Formulas",
    count: 5,
    labels: ["Formula Suggestions", "Formula Editing", "Error Feedback"],
  },
  { name: "Charts", count: 5, labels: ["Chart Formatting", "Axis Controls"] },
  {
    name: "Automation & AI",
    count: 3,
    labels: ["Faster AI", "Model Execution"],
  },
  {
    name: "Navigation & Polish",
    count: 6,
    labels: ["Keyboard Navigation", "Dark Dashboards"],
  },
  {
    name: "Card Editing",
    count: 3,
    labels: ["Card Creation", "Card Resizing"],
  },
];
const grouped = categories.flatMap((c) =>
  Array.from({ length: c.count }, (_, i) => ({
    label: c.labels[i % c.labels.length],
    category: c.name,
  })),
);
export const updates = Array.from({ length: grouped.length }, (_, i) => ({
  ...grouped[(i * 19) % grouped.length],
  id: i,
}));
export const arrivalsA = updates.map((_, i) =>
  i < 5 ? 2 + i * 0.65 : 5 + 4.65 * Math.pow((i - 5) / 43, 0.65),
);
export const arrivalsB = updates.map(
  (_, i) => 1 + 7.7 * Math.pow(i / 48, 0.63),
);
export const theme = {
  background: "#111315",
  panel: "#202326",
  border: "#393D40",
  text: "#F3F5F2",
  muted: "#9EA6A4",
  accent: "#CBF277",
};
