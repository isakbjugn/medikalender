<script>
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<section>
	<h1>
		Når må medisinen fornyes?
	</h1>

	<h2>
		En app for å hjelpe leger med resepter
	</h2>

	<Calendar />
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
