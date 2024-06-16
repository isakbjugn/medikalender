<script>
	import Calendar from '$lib/components/Calendar.svelte';
	import { page } from '$app/stores';
</script>

<section>
	<h1>
		Når må resepten fornyes?
	</h1>

	<h2>
		En app for å hjelpe leger med resepter
	</h2>

	<Calendar holidays={$page.data.holidays}  />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
