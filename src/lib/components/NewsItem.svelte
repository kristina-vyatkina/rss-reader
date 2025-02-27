<script lang="ts">
	export let item: {
		// Проп с данными новост
		title: string;
		link: string;
		description: string;
		pubDate: string;
	};
</script>

<article class="news-item glass-effect news-item">
	<header>
		<h3>{item.title}</h3>
		<!--Заголовок новости-->
		<div class="meta">
			<time datetime={item.pubDate}>{item.pubDate}</time>
			<!--// Дата в машиночитаемом формате-->
			<a href={item.link} target="_blank" rel="noopener">Читать полностью</a>
			<!--// Внешняя ссылка-->
		</div>
	</header>

	{#if item.description}
		<div class="content">{@html item.description}</div>
		<!--Опасный HTML (нужна санитизация)-->
	{/if}
</article>

<style>
	.news-item {
		background: var(--background);
		border-radius: 15px;
		padding: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: transform 0.2s ease;
	}

	time {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	time::before {
		content: '🕒';
		font-size: 0.8em;
	}

	h3 {
		font-family: var(--font-heading);
		color: var(--primary);
		margin: 0 0 0.5rem;
		font-size: 1.5rem;
	}

	.meta {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1rem;
		font-size: 0.9em;
		color: var(--text);
		opacity: 0.8;
	}

	.content {
		line-height: 1.6;
		color: var(--text);
		border-left: 3px solid var(--accent);
		padding-left: 1rem;
	}
</style>
