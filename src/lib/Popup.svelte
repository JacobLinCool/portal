<script lang="ts">
	export let id = Math.random().toString(36).substring(2);

	let checked = false;
	let loaded = false;
	$: {
		if (checked) {
			loaded = true;
		}
	}
</script>

<label for="popup-{id}" {...$$props}>
	<slot name="button" />
</label>

<input type="checkbox" id="popup-{id}" bind:checked class="modal-toggle" />
<label for="popup-{id}" class="modal cursor-pointer">
	<label class="modal-box relative max-w-sm" for="">
		{#if checked || loaded}
			<slot name="body" />
		{/if}
	</label>
</label>
