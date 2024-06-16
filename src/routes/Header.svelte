<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src="$lib/images/svelte-logo.svg" alt="SvelteKit" />
		</a>
	</div>

	<div class="corner">
		<a href="https://github.com/isakbjugn/medikalender">
			<img src="$lib/images/github.svg" alt="GitHub" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
