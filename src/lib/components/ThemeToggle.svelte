<script lang="ts">
	let isDark = false; // Состояние темы

	const toggleTheme = () => {
		// Переключаем атрибут темы в корневом элементе
		const html = document.documentElement;
		html.style.setProperty('color-scheme', isDark ? 'light' : 'dark');
		html.setAttribute('data-theme', isDark ? '' : 'dark');
		isDark = !isDark;
	};
</script>

<div class="theme-toggle">
	<button class="gradient-btn" on:click={toggleTheme}>
		<!--Обработчик клика-->
		{isDark ? '🌞 Светлая' : '🌙 Тёмная'}
		<!--Динамическая иконка-->
	</button>
</div>

<style>
	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1000;
	}

	button {
		background: none;
		border: 2px solid var(--primary);
		color: var(--text);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	button:hover {
		background: var(--primary);
		color: white;
	}
</style>
