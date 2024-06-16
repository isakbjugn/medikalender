<script>
  import { DatePicker, localeFromDateFnsLocale } from 'date-picker-svelte'
	import { nb } from 'date-fns/locale'
  import { onMount } from 'svelte';
  import {
    get_first_day_of_last_year,
    get_last_day_of_next_year
  } from '$lib/utils/date-utils';
  
  export let date = new Date();
  const locale = localeFromDateFnsLocale(nb);
  let datePickerVisible = false;

  /**
	 * @param {Date} dateToPrint
	 */
	 const print_date = (dateToPrint) => {
		const options = {
			month: "short",
			day: "numeric"
		};
		// @ts-ignore
		return dateToPrint.toLocaleDateString("no-NO", options)
  }

  onMount(() => {
    document.addEventListener("click", (event) => {
      const datePicker = document.querySelector(".datepicker");
      const datePickerButton = document.querySelector(".datepicker-button");
      let targetElement = event.target;

      do {
        if (targetElement == datePickerButton) {
          datePickerVisible = !datePickerVisible;
          return
        }
        if (targetElement == datePicker) {
          return
        }
        // @ts-ignore
        targetElement = targetElement.parentNode; 
      } while (targetElement);
      datePickerVisible = false;
    })
  })

</script>

<div class="counter">
  <div class="counter-viewport">
    <input type="text" value={print_date(date)} class="counter-input" readonly>
  </div>

  <button class="datepicker-button">
    <i class="fa-regular fa-calendar" />
  </button>

  <div class="datepicker" hidden={!datePickerVisible}>
    <DatePicker
      bind:value={date}
      min={get_first_day_of_last_year()}
      max={get_last_day_of_next_year()}
      {locale}
      on:select={() => datePickerVisible = false}
    />
  </div>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
		background-color: transparent;
    position: relative;
	}

  .counter > :global(body) {
		--date-picker-foreground: black;
		--date-picker-background: transparent;
		--date-picker-highlight-border: hsl(var(--deg), 98%, 49%);
		--date-picker-highlight-shadow: hsla(var(--deg), 98%, 49%, 50%);
		--date-picker-selected-color: hsl(var(--deg), 100%, 85%);
		--date-picker-selected-background: hsla(var(--deg), 98%, 49%, 20%);
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

  i {
    font-size: 0.75em;
		color: #444;
  }

  .datepicker {
    position: absolute;
    top: 60px;
  }

	.counter-viewport {
		display: block;
		overflow: hidden;
		justify-content: space-between;
		background-color: transparent;
	}

	.counter-input {
    margin-left: 15px;
		width: 4em;
		font-size: 3em;
		border: 0;
		background: transparent;
		text-align: center;
    align-items: center;
    justify-content: center;
    align-content: center;
	}

	.counter-input:hover {
		border: none;
	}
</style>
