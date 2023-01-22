<script>
  export let date = new Date();
  let dateStr = date.toISOString().split('T')[0]
  $: parsedDate = new Date(Date.parse(dateStr));
  $: formattedDate = print_date(parsedDate);
  $: updateDate(dateStr);

  /**
	 * @param {String} dateStr
	 */
  const updateDate = (dateStr) => {
    date = new Date(Date.parse(dateStr));
  }

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
</script>

<div class="counter">

	<div class="counter-viewport">
		<input type="text" bind:value={formattedDate} class="counter-input">
	</div>
  <div class="datepicker-viewport">
		<input type="date" bind:value={dateStr} class="datepicker-icon">
	</div>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter-viewport {
		display: block;
		overflow: hidden;
		justify-content: space-between;
	}

	.counter-input {
    margin-left: 30px;
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

  .datepicker-viewport {
    margin: auto 10px;
	}

  .datepicker-icon {
    width: 20px;
    font-size: 1em;
    overflow: hidden;
		background: transparent;
		border: 0;
  }
</style>
