<script lang="ts">
  interface Submission {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    service: string;
    message: string | null;
    status: string;
    notes: string | null;
    created_at: string;
  }

  let submissions = $state<Submission[]>([]);
  let loading = $state(true);
  let error = $state('');
  let activeFilter = $state('all');
  let selectedId = $state<string | null>(null);
  let updatingId = $state<string | null>(null);

  const selected = $derived(submissions.find(s => s.id === selectedId) || null);

  const filters = ['all', 'new', 'quoted', 'accepted', 'declined', 'archived'] as const;

  const filtered = $derived(
    activeFilter === 'all'
      ? submissions
      : submissions.filter(s => s.status === activeFilter)
  );

  $effect(() => {
    fetchSubmissions();

    // Check URL for ?open=id
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    if (openId) selectedId = openId;
  });

  async function fetchSubmissions() {
    try {
      const res = await fetch('/api/admin/submissions');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      submissions = data.submissions || [];
    } catch {
      error = 'Failed to load submissions';
    } finally {
      loading = false;
    }
  }

  async function updateStatus(id: string, status: string) {
    updatingId = id;
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Update failed');
      const data = await res.json();
      submissions = submissions.map(s => s.id === id ? data.submission : s);
    } catch {
      alert('Failed to update status');
    } finally {
      updatingId = null;
    }
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
</script>

{#if loading}
  <div class="loading">Loading submissions...</div>
{:else if error}
  <div class="error">{error}</div>
{:else}
  <!-- Filters -->
  <div class="filters">
    {#each filters as f}
      <button
        class="filter-btn {activeFilter === f ? 'active' : ''}"
        onclick={() => { activeFilter = f; selectedId = null; }}
      >
        {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
        {#if f === 'all'}
          <span class="filter-count">{submissions.length}</span>
        {:else}
          {@const count = submissions.filter(s => s.status === f).length}
          {#if count > 0}
            <span class="filter-count">{count}</span>
          {/if}
        {/if}
      </button>
    {/each}
  </div>

  <div class="list-layout" class:has-detail={!!selected}>
    <!-- List -->
    <div class="list-panel">
      {#if filtered.length === 0}
        <div class="empty">No {activeFilter === 'all' ? '' : activeFilter} submissions</div>
      {:else}
        {#each filtered as sub}
          <button
            class="list-row {selectedId === sub.id ? 'selected' : ''}"
            onclick={() => selectedId = sub.id}
          >
            <div class="row-top">
              <span class="row-name">{sub.name}</span>
              <span class="status-badge {sub.status}">{sub.status}</span>
            </div>
            <div class="row-mid">{sub.service}</div>
            <div class="row-bottom">{formatDate(sub.created_at)}</div>
          </button>
        {/each}
      {/if}
    </div>

    <!-- Detail panel -->
    {#if selected}
      <div class="detail-panel">
        <div class="detail-header">
          <h2>{selected.name}</h2>
          <button class="close-btn" onclick={() => selectedId = null}>&times;</button>
        </div>

        <div class="detail-grid">
          <div class="detail-field">
            <span class="field-label">Email</span>
            <a href="mailto:{selected.email}" class="field-value link">{selected.email}</a>
          </div>
          <div class="detail-field">
            <span class="field-label">Phone</span>
            {#if selected.phone}
              <a href="tel:{selected.phone}" class="field-value link">{selected.phone}</a>
            {:else}
              <span class="field-value muted">Not provided</span>
            {/if}
          </div>
          <div class="detail-field">
            <span class="field-label">Service</span>
            <span class="field-value">{selected.service}</span>
          </div>
          <div class="detail-field">
            <span class="field-label">Submitted</span>
            <span class="field-value">{formatDate(selected.created_at)}</span>
          </div>
        </div>

        {#if selected.message}
          <div class="detail-section">
            <span class="field-label">Message</span>
            <p class="message-text">{selected.message}</p>
          </div>
        {/if}

        <div class="detail-section">
          <span class="field-label">Status</span>
          <div class="status-actions">
            {#each ['new', 'quoted', 'accepted', 'declined', 'archived'] as s}
              <button
                class="status-btn {selected.status === s ? 'active ' + s : ''}"
                disabled={updatingId === selected.id}
                onclick={() => updateStatus(selected.id, s)}
              >
                {s}
              </button>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .loading, .error, .empty {
    padding: 40px;
    text-align: center;
    color: #6b7280;
    font-size: 14px;
  }
  .error { color: #dc2626; }

  /* Filters */
  .filters {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .filter-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    background: #fff;
    font-size: 13px;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s;
  }
  .filter-btn:hover { border-color: #d1d5db; color: #374151; }
  .filter-btn.active {
    background: #111827;
    color: #fff;
    border-color: #111827;
  }
  .filter-count {
    font-size: 11px;
    background: rgba(0,0,0,0.06);
    padding: 1px 6px;
    border-radius: 9999px;
  }
  .filter-btn.active .filter-count { background: rgba(255,255,255,0.2); }

  /* List layout */
  .list-layout { display: flex; gap: 20px; }
  .list-layout.has-detail .list-panel { flex: 0 0 380px; }
  .list-panel { flex: 1; min-width: 0; }
  .detail-panel {
    flex: 1;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 24px;
    min-width: 0;
  }

  @media (max-width: 900px) {
    .list-layout { flex-direction: column; }
    .list-layout.has-detail .list-panel { flex: none; }
  }

  /* List rows */
  .list-row {
    display: block;
    width: 100%;
    text-align: left;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 14px 18px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .list-row:hover { border-color: #d1d5db; }
  .list-row.selected {
    border-color: #059669;
    box-shadow: 0 0 0 1px #059669;
  }
  .row-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .row-name { font-size: 14px; font-weight: 600; color: #111827; }
  .row-mid { font-size: 13px; color: #6b7280; }
  .row-bottom { font-size: 12px; color: #9ca3af; margin-top: 4px; }

  /* Status badges */
  .status-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 10px;
    border-radius: 9999px;
    text-transform: capitalize;
    background: #f3f4f6;
    color: #6b7280;
  }
  .status-badge.new { background: #fef3c7; color: #92400e; }
  .status-badge.quoted { background: #dbeafe; color: #1e40af; }
  .status-badge.accepted { background: #d1fae5; color: #065f46; }
  .status-badge.declined { background: #fee2e2; color: #991b1b; }
  .status-badge.archived { background: #f3f4f6; color: #6b7280; }

  /* Detail panel */
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f3f4f6;
  }
  .detail-header h2 {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    text-transform: none;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #9ca3af;
    cursor: pointer;
    line-height: 1;
    padding: 4px;
  }
  .close-btn:hover { color: #374151; }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }
  @media (max-width: 600px) { .detail-grid { grid-template-columns: 1fr; } }

  .detail-field { display: flex; flex-direction: column; gap: 4px; }
  .field-label { font-size: 12px; font-weight: 500; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
  .field-value { font-size: 14px; color: #111827; }
  .field-value.link { color: #059669; text-decoration: none; }
  .field-value.link:hover { text-decoration: underline; }
  .field-value.muted { color: #9ca3af; }

  .detail-section { margin-bottom: 24px; }
  .detail-section .field-label { margin-bottom: 8px; display: block; }
  .message-text {
    font-size: 14px;
    color: #374151;
    line-height: 1.6;
    background: #f9fafb;
    padding: 14px 16px;
    border-radius: 6px;
    white-space: pre-wrap;
    max-width: none;
  }

  /* Status action buttons */
  .status-actions { display: flex; gap: 6px; flex-wrap: wrap; }
  .status-btn {
    padding: 6px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #fff;
    font-size: 13px;
    color: #6b7280;
    cursor: pointer;
    text-transform: capitalize;
    transition: all 0.15s;
  }
  .status-btn:hover:not(:disabled) { border-color: #d1d5db; color: #374151; }
  .status-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .status-btn.active { font-weight: 600; }
  .status-btn.active.new { background: #fef3c7; border-color: #fbbf24; color: #92400e; }
  .status-btn.active.quoted { background: #dbeafe; border-color: #60a5fa; color: #1e40af; }
  .status-btn.active.accepted { background: #d1fae5; border-color: #34d399; color: #065f46; }
  .status-btn.active.declined { background: #fee2e2; border-color: #f87171; color: #991b1b; }
  .status-btn.active.archived { background: #f3f4f6; border-color: #9ca3af; color: #374151; }
</style>
