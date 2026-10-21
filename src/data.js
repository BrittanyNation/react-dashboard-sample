// Mock API layer. In production these would be fetch() calls to a REST API;
// keeping them behind functions means the UI never changes when the source does.
const projects = [
  { id: 1, name: 'Website Redesign', client: 'Harbor & Pine', status: 'On Track', progress: 72, budget: 18400 },
  { id: 2, name: 'Email Lifecycle Build', client: 'Bloom & Co.', status: 'At Risk', progress: 45, budget: 9600 },
  { id: 3, name: 'Docs Migration', client: 'Northwind Labs', status: 'On Track', progress: 88, budget: 12750 },
  { id: 4, name: 'Checkout Revamp', client: 'Trailhead Supply', status: 'Delayed', progress: 30, budget: 22100 },
  { id: 5, name: 'Help Center Launch', client: 'Juniper Health', status: 'On Track', progress: 64, budget: 15300 },
];

export function fetchProjects() {
  return new Promise(resolve => setTimeout(() => resolve([...projects]), 150));
}

export function summarize(list) {
  const totalBudget = list.reduce((sum, p) => sum + p.budget, 0);
  const avgProgress = Math.round(list.reduce((sum, p) => sum + p.progress, 0) / list.length);
  const atRisk = list.filter(p => p.status !== 'On Track').length;
  return { count: list.length, totalBudget, avgProgress, atRisk };
}
