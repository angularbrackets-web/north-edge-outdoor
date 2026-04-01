<script lang="ts">
  interface Submission {
    id: string;
    status: string;
    created_at: string;
    name: string;
    service: string;
  }

  let submissions = $state<Submission[]>([]);
  let loading = $state(true);
  let error = $state('');

  const stats = $derived(() => {
    const total = submissions.length;
    const newCount = submissions.filter(s => s.status === 'new').length;
    const quoted = submissions.filter(s => s.status === 'quoted').length;
    const accepted = submissions.filter(s => s.status === 'accepted').length;
    const today = submissions.filter(s => {
      const d = new Date(s.created_at);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length;
    return { total, newCount, quoted, accepted, today };
  });

  $effect(() => {
    fetchSubmissions();
  });

  async function fetchSubmissions() {
    try {
      const res = await fetch('/api/admin/submissions');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      submissions = data.submissions || [];
    } catch {
      error = 'Failed to load dashboard data';
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <div class="loading">Loading dashboard...</div>
{:else if error}
  <div class="error">{error}</div>
{:else}
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{stats().newCount}</div>
      <div class="stat-label">New Requests</div>
      <div class="stat-badge new">Needs attention</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{stats().today}</div>
      <div class="stat-label">Today</div>
      <div class="stat-sub">submissions received</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{stats().quoted}</div>
      <div class="stat-label">Quoted</div>
      <div class="stat-sub">awaiting response</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{stats().accepted}</div>
      <div class="stat-label">Accepted</div>
      <div class="stat-sub">total won</div>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <h2>Recent Submissions</h2>
      <a href="/admin/submissions" class="view-all">View all &rarr;</a>
    </div>

    {#if submissions.length === 0}
      <div class="empty">No submissions yet. They'll appear here once customers use the contact form.</div>
    {:else}
      <div class="recent-list">
        {#each submissions.slice(0, 5) as sub}
          <a href="/admin/submissions?open={sub.id}" class="recent-item">
            <div class="recent-main">
              <span class="recent-name">{sub.name}</span>
              <span class="recent-service">{sub.service}</span>
            </div>
            <div class="recent-meta">
              <span class="status-dot {sub.status}"></span>
              <span class="recent-time">{formatRelative(sub.created_at)}</span>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<script lang="ts" module>
  function formatRelative(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
  }
</script>

<style>
  .loading, .error, .empty {
    padding: 40px;
    text-align: center;
    color: #6b7280;
    font-size: 14px;
  }
  .error { color: #dc2626; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .stat-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 20px;
  }
  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    line-height: 1;
  }
  .stat-label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-top: 6px;
  }
  .stat-sub {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 2px;
  }
  .stat-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 9999px;
    margin-top: 8px;
  }
  .stat-badge.new { background: #fef3c7; color: #92400e; }

  .section { margin-top: 8px; }
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .section-header h2 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    text-transform: none;
  }
  .view-all {
    font-size: 13px;
    color: #059669;
    text-decoration: none;
    font-weight: 500;
  }
  .view-all:hover { text-decoration: underline; }

  .recent-list {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
  }
  .recent-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid #f3f4f6;
    text-decoration: none;
    color: inherit;
    transition: background 0.1s;
  }
  .recent-item:last-child { border-bottom: none; }
  .recent-item:hover { background: #f9fafb; }
  .recent-main { display: flex; flex-direction: column; gap: 2px; }
  .recent-name { font-size: 14px; font-weight: 500; color: #111827; }
  .recent-service { font-size: 13px; color: #6b7280; }
  .recent-meta { display: flex; align-items: center; gap: 8px; }
  .recent-time { font-size: 12px; color: #9ca3af; }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #9ca3af;
  }
  .status-dot.new { background: #f59e0b; }
  .status-dot.quoted { background: #3b82f6; }
  .status-dot.accepted { background: #10b981; }
  .status-dot.declined { background: #ef4444; }
  .status-dot.archived { background: #6b7280; }
</style>
