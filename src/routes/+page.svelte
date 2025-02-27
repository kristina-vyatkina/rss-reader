<script lang="ts">
	//onMount - хук жизненного цикла Svelte для выполнения кода после монтирования компонента
	//Импорт пользовательских компонентов для формы, списка новостей и ошибок
	//Утилита parseRSS для парсинга RSS-ленты

	import { onMount } from 'svelte';
	import RSSForm from '$lib/components/RSSForm.svelte';
	import NewsList from '$lib/components/NewsList.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { parseRSS } from '$lib/utils/rssParser';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import SettingsModal from '$lib/components/SettingsModal.svelte';

	let url = 'https://www.opennet.ru/opennews/opennews_all_utf.rss'; // Дефолтный URL RSS
	let feedData: any[] = []; // Хранилище распарсенных данных
	let isLoading = false; // Флаг загрузки
	let error = ''; // Сообщение об ошибке
	let layout: 'vertical' | 'two-columns' | 'grid' = 'vertical';
	let isOpen = false;
	const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // Прокси для обхода CORS

	//Функция загрузки RSS
	const loadRSS = async () => {
		// Валидация URL
		if (!url) {
			error = 'Введите URL RSS-ленты';
			return;
		}

		isLoading = true; // Активируем индикатор загрузки
		error = ''; // Сбрасываем ошибки

		try {
			// Запрос через CORS-прокси с дополнительными заголовками
			const response = await fetch(CORS_PROXY + url, {
				headers: { 'X-Requested-With': 'XMLHttpRequest' }
			});

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			// Парсинг ответа и преобразование в структуру данных
			const data = await response.text();
			feedData = parseRSS(data);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Неизвестная ошибка';
			console.error('Произошла ошибка:', err);
		} finally {
			isLoading = false; // Выключаем индикатор в любом случае
		}
	};
	//Хук жизненного цикла
	onMount(() => {
		loadRSS(); // Первоначальная загрузка

		// Автообновление каждые 60 секунд
		const interval = setInterval(loadRSS, 60000);

		// Очистка при демонтировании
		return () => clearInterval(interval);
	});
</script>

<!-- Добавляем кнопку настроек -->
<button class="settings-btn" on:click={() => (isOpen = true)}> ⚙️ </button>

<!--Шаблон компоненты-->
<ThemeToggle />
<RSSForm bind:url {isLoading} on:submit={loadRSS} />
<ErrorMessage {error} />
<NewsList {feedData} {isLoading} {layout} />
<SettingsModal bind:isOpen bind:layout />
<!--двухстороняя привязка-->
<!--RSSForm принимает:
Двухстороннюю привязку (bind:url) для ввода URL
Пропс isLoading для состояния загрузки
Обработчик события submit для обновления
ErrorMessage отображает сообщения об ошибках
NewsList показывает список новостей и состояние загрузки
-->
