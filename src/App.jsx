import { useEffect, useMemo, useState } from 'react';
import { fetchProjects, summarize } from './data.js';

function StatCard({ label, value }) {
  return <div className="card"><p className="stat-label">{label}</p><p className="stat-value">{value}</p></div>;
}

function ProgressBar({ value }) {
  return (
    <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <div className="bar-fill" style={{ width: value + '%' }} />
    </div>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => { fetchProjects().then(setProjects); }, []);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter(p => p.status === filter)),
    [projects, filter]
  );
  const stats = useMemo(() => summarize(visible), [visible]);

  return (
    <main className="wrap">
      <h1>PulseBoard</h1>
      <div className="cards">
        <StatCard label="Projects" value={stats.count} />
        <StatCard label="Total Budget" value={'$' + stats.totalBudget.toLocaleString()} />
        <StatCard label="Avg. Progress" value={(stats.avgProgress || 0) + '%'} />
        <StatCard label="Needs Attention" value={stats.atRisk} />
      </div>
      <label>
        Status{' '}
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option>All</option><option>On Track</option><option>At Risk</option><option>Delayed</option>
        </select>
      </label>
      <table>
        <thead><tr><th>Project</th><th>Client</th><th>Status</th><th>Progress</th><th>Budget</th></tr></thead>
        <tbody>
          {visible.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td><td>{p.client}</td><td>{p.status}</td>
              <td><ProgressBar value={p.progress} /></td><td>${p.budget.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
