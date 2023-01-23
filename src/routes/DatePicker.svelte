<script>
  export let date = new Date();
  let dateStr = date.toISOString().split('T')[0]
  $: parsedDate = new Date(Date.parse(dateStr));
  $: formattedDate = print_date(parsedDate);
  $: updateDate(dateStr);
  /**
	 * @type HTMLInputElement
	 */
  let datePicker;

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

  const printShowPickerInfo = () => {
    if ('showPicker' in HTMLInputElement.prototype) {
      alert("showPicker støttes!")
    } else {
      alert("showPicker støttes ikke!")
    }
    datePicker.showPicker();
  }

</script>

<div class="counter">
	<div class="counter-viewport">
    <input type="text" bind:value={formattedDate} class="counter-input">
  </div>

  <button on:click={() => datePicker.showPicker()} class="datepicker-button">
    <i class="fa-regular fa-calendar" />
    <input bind:this={datePicker} type="date" bind:value={dateStr} class="datepicker" />
  </button>

  <button on:click={() => printShowPickerInfo()} >Kul knapp!</button>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
		background-color: transparent;
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

  i {
    font-size: 0.75em;
		color: #444;
  }

  .datepicker {
    width: 0;
    height: 0;
    border: none;
    background-color: transparent;
    color: transparent;
    opacity: 0;
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
