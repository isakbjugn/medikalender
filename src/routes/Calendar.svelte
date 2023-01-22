<script>
	import { onMount } from 'svelte';
	import DatePicker from './DatePicker.svelte';
	import IntPicker from './IntPicker.svelte';
	import { get_holiday_description, find_next_day } from './date-utils';

	let number_of_doses = 30;
	let doses_daily = 1;
	let start_date = new Date();
	$: next_date = find_next_day(number_of_doses, doses_daily, start_date);
	$: next_date_str = print_date(next_date);
	$: holiday_description = get_holiday_description(next_date, holidays);
	$: date_style = check_if_red_day(holiday_description); 
	/**
	 * @type {any[]}
	 */
	let holidays = [];

	onMount(async () => {
		await fetch_holidays();
	});

	/**
	 * @param {String} desc
	 */
	const check_if_red_day = (desc) => {
		if (["Ukedag", "Lørdag"].includes(desc)) return "";
		return "red";
	}

	const fetch_holidays = (async () => {
		const url = "https://webapi.no/api/v1/holidays/" + next_date.getFullYear();
		const response = await fetch(url);
		const data = await response.json();
		holidays = data.data;
	});

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
	<div class="input-fields">
		<p>Hvor mange doser inneholder resepten?</p>
		<IntPicker bind:value={number_of_doses} />

		<p>Hvor mange doser daglig?</p>
		<IntPicker bind:value={doses_daily} />

		<p>Når starter behandlingen?</p>
		<DatePicker bind:date={start_date} />
	</div>
	<div class="info">
		<p>Første dag uten medisin:</p>
		<strong>{next_date_str} </strong><strong class={date_style}> ({holiday_description})</strong>
	</div>
</div>

<style>
	.input-fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}

	@media screen and (max-width: 768px) {
		.input-fields {	
			grid-template-columns: 1fr;
			justify-items: center;
		}
	}

	.info {
		text-align: center;
	}

	.red {
		color: red;
	}
</style>
