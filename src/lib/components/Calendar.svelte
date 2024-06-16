<script lang="ts">
	import type { Holiday } from '$lib/types';
	import DatePicker from './DatePicker.svelte';
	import IntPicker from '$lib/components/IntPicker.svelte';
	import { get_holiday_description, find_next_day, toNorwegianLongDateString, isRedDay } from '../utils/date-utils';

	export let holidays: Holiday[];

	let number_of_doses = 30;
	let doses_daily = 1;
	let start_date = new Date();

	$: next_date = find_next_day(number_of_doses, doses_daily, start_date);
	$: next_date_str = toNorwegianLongDateString(next_date);
	$: holiday_description = get_holiday_description(next_date, holidays);
	$: holiday_description_view = holidays.length === 0
		? ""
		: ` (${holiday_description})`;
	$: date_style = isRedDay(holiday_description) ? "red" : "";
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
		<strong>{next_date_str} </strong><strong class={date_style}>{holiday_description_view}</strong>
	</div>
</div>

<style>
	.input-fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		background-color: transparent;
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
