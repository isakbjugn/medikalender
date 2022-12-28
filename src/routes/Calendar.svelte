<script>
	import { onMount } from 'svelte';

	let number_of_days = 30;
	$: next_date = count_days(number_of_days);
	$: next_date_str = print_date(next_date);
	$: holiday_description = get_holiday_description(next_date, holidays);
	/**
	 * @type {any[]}
	 */
	let holidays = [];

	onMount(async () => {
		await fetch_holidays();
	});

	const fetch_holidays = (async () => {
		const url = "https://webapi.no/api/v1/holidays/" + next_date.getFullYear();
		const response = await fetch(url);
		const data = await response.json();
		holidays = data.data;
	});

	/**
	 * @param {Date} date
	 * @param {any[]} holidays
	 */
	 const get_holiday_description = (date, holidays) => {
		if (holidays.length === 0) {
			return ""
		}
		for (const holiday of holidays) {
			const holiday_date = new Date(holiday.date);
			console.log("Helligdag: ", holiday_date.getDate())
			if (is_same_day(holiday_date, date)) {
				return holiday.description;
			}
		}
		switch (date.getDay()) {
			case 0: return "Søndag";
			case 6: return "Lørdag";
			default: return "Ukedag";
		}
	};

	/**
	 * @param {Date} d1
	 * @param {Date} d2
	 */
	const is_same_day = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth();
}

	/**
	 * @param {number} days
	 */
	const count_days = (days) => {
		let today = new Date();
		return new Date(today.setDate(today.getDate() + days));
	}

	/**
	 * @param {Date} date
	 */
	 const print_date = (date) => {
		const options = {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
		};
		// @ts-ignore
		return date.toLocaleDateString("no-NO", options)
	}
</script>

<div>
	<div class="counter">

		<button on:click={() => (number_of_days -= 1)} aria-label="Decrease the counter by one">
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5" />
			</svg>
		</button>
		
		<div class="counter-viewport">
			<input type=number bind:value={number_of_days} min=1 class="counter-input">
		</div>

		<button on:click={() => (number_of_days += 1)} aria-label="Increase the counter by one">
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
			</svg>
		</button>

	</div>
	<div class="info">
		<p>Første dag uten medisin:</p>
		<strong class="next-date">{next_date_str} ({holiday_description})</strong>
	</div>

</div>


<style>
	.info {
		text-align: center;
	}

	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		display: block;
		overflow: auto;
		align-items: center;
	}

	.counter-input {
		height: 100%;
		width: 3em;
		font-size: 4em;
		border: 0;
		background: transparent;
		text-align: center;
	}

	.counter-input:hover {
		border: none;
	}

	input[type="number"] {
  -webkit-appearance: textfield;
     -moz-appearance: textfield;
          appearance: textfield;
	}
	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
		-webkit-appearance: none;
	}
</style>
