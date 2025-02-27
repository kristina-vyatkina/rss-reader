<script lang="ts">
	export let url: string;
	export let isLoading: boolean;
	let disabled;
</script>

<form on:submit|preventDefault>
	<!-- Отмена стандартного поведения формы-->
	<!--bind:value={url} Двустороннее связывание значения
  {disabled} Блокировка при загрузке-->
	<input
		type="url"
		bind:value={url}
		placeholder="Например: https://habr.com/ru/rss/articles/"
		{disabled}
	/>
	<!--{isLoading ? 'Загрузка...' : 'Загрузить'} 
  Динамический текст кнопки-->
	<button {disabled}>
		{isLoading ? 'Загрузка...' : 'Загрузить'}
	</button>
</form>

<style>
	form {
		display: flex;
		gap: 1rem;
		margin: 2rem 0;
		max-width: 800px;
		width: 100%;
	}

	input {
		flex: 1;
		border: 2px solid var(--secondary);
		border-radius: 30px;
		padding: 1rem 1.5rem;
		font-size: 1rem;
		transition: border-color 0.3s ease;
		background: var(--background);
		color: var(--text);
	}

	button {
		background: linear-gradient(135deg, var(--primary), var(--secondary));
		border: none;
		padding: 1rem 2.5rem;
		color: white;
		border-radius: 30px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 600;
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
</style>
