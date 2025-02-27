<script lang="ts">
	// Принимаем сообщение об ошибке через проп
	export let error: string;
</script>

{#if error}
	<div class="error-message">
		⚠️ {error}
		<!--// Отображаем иконку и текст ошибки-->
	</div>
{/if}

<style>
	.error-message {
		background: #fee;
		color: #c00;
		padding: 1rem;
		border-radius: 8px;
		border: 2px solid #fcc;
		margin: 1rem 0;
		font-weight: 500;
	}
</style>
