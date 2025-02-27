<script lang="ts">
	export let feedData: any[]; // Массив данных новостей
	export let isLoading: boolean; // Флаг состояния загрузки
	export let layout: 'vertical' | 'two-columns' | 'grid';
	import NewsItem from '$lib/components/NewsItem.svelte';
</script>

{#if feedData.length > 0}
	<div class="news-list {layout}">
		{#each feedData as item (item.link)}
			<!--// Уникальный ключ для каждой новости-->
			<NewsItem {item} />
			<!--Рендер компонента новости-->
		{/each}
	</div>
{:else if !isLoading}
	<div class="empty-state">
		<p>Введите URL RSS-ленты, чтобы начать</p>
		<!--Сообщение при пустом состоянии-->
	</div>
{/if}

<style>
	.news-list {
		display: grid;
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: var(--text);
		opacity: 0.6;
	}
</style>
