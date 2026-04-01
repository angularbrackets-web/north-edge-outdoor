<script lang="ts">
  import { siteConfig } from '@/config/site';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleLogin(e: Event) {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || 'Login failed';
        loading = false;
        return;
      }

      window.location.href = '/admin';
    } catch {
      error = 'Network error — please try again';
      loading = false;
    }
  }
</script>

<div class="login-wrapper">
  <div class="login-card">
    <div class="login-header">
      <h1>{siteConfig.business.name} <span>Admin</span></h1>
      <p>Sign in to manage submissions &amp; quotes</p>
    </div>

    {#if error}
      <div class="error-alert" role="alert">{error}</div>
    {/if}

    <form onsubmit={handleLogin}>
      <label>
        <span class="label-text">Email</span>
        <input
          type="email"
          bind:value={email}
          required
          autocomplete="email"
          placeholder="admin@example.com"
        />
      </label>

      <label>
        <span class="label-text">Password</span>
        <input
          type="password"
          bind:value={password}
          required
          autocomplete="current-password"
          placeholder="Enter password"
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #f3f4f6;
  }
  .login-card {
    width: 100%;
    max-width: 400px;
    background: #fff;
    border-radius: 12px;
    padding: 40px 32px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  }
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-header h1 {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 6px;
    text-transform: none;
  }
  .login-header h1 span { color: #059669; }
  .login-header p {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }
  .error-alert {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  form { display: flex; flex-direction: column; gap: 20px; }
  label { display: flex; flex-direction: column; gap: 6px; }
  .label-text {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
  input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 15px;
    color: #111827;
    outline: none;
    transition: border-color 0.15s;
  }
  input::placeholder { color: #9ca3af; }
  input:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }
  button {
    padding: 12px;
    background: #111827;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
    margin-top: 4px;
  }
  button:hover:not(:disabled) { background: #1f2937; }
  button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
