<script lang="ts">
  import { siteConfig, type BackgroundEffect } from '@/config/site';
  import FloatingShapes from './FloatingShapes.svelte';
  import FlowingPaths from './FlowingPaths.svelte';
  import AuroraGlow from './AuroraGlow.svelte';

  let { section }: { section: keyof typeof siteConfig.backgrounds } = $props();

  const effect: BackgroundEffect = siteConfig.backgrounds[section];
</script>

{#if effect.type === 'floatingShapes'}
  <FloatingShapes variant={effect.variant} />
{:else if effect.type === 'flowingPaths'}
  <FlowingPaths />
{:else if effect.type === 'auroraGlow'}
  <AuroraGlow />
{:else if effect.type === 'combo'}
  <FloatingShapes variant={effect.shapes} />
  {#if effect.paths}
    <FlowingPaths />
  {/if}
{/if}
