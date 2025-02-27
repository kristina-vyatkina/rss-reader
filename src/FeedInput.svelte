<script lang="ts">
	//Импорт onMount из Svelte для выполнения кода при монтировании компонента
	import { onMount } from 'svelte';

	// переменные:
	// url - начальный URL RSS-ленты
	// feedData - массив для хранения распарсенных данных
	// isLoading - флаг состояния загрузки
	// error - строка для хранения сообщений об ошибках

	let url = 'https://www.opennet.ru/opennews/opennews_all_utf.rss';
	let feedData: any[] = [];
	let isLoading = false;
	let error = '';
	//Прокси-сервер для обхода CORS-ограничений браузера
	const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

	// Парсер RSS:
	//Создание XML-парсера для обработки RSS-фида
	//Преобразование текста в XML-документ
	const parseRSS = (xmlText: string) => {
		try {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
			//Обработка элементов:
			//Извлечение и обработка элементов item из RSS
			//Создание объектов с данными статей
			const items = xmlDoc.getElementsByTagName('item');
			const result = [];

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				result.push({
					title: item.getElementsByTagName('title')[0]?.textContent || 'Без названия',
					link: item.getElementsByTagName('link')[0]?.textContent || '#',
					description: item.getElementsByTagName('description')[0]?.textContent || '',
					pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || ''
				});
			}

			return result;
		} catch (err) {
			throw new Error('Ошибка парсинга RSS');
		}
	};
	//Функция загрузки RSS:
	//Проверка наличия URL перед загрузкой
	const loadRSS = async () => {
		if (!url) {
			error = 'Введите URL RSS-ленты';
			return;
		}

		isLoading = true;
		error = '';
		//Запрос данных:
		//Выполнение запроса через CORS-прокси
		//Добавление заголовка для обхода CORS
		try {
			const response = await fetch(CORS_PROXY + url, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			//Обработка ответа:
			//Чтение ответа как текст
			//Парсинг данных и обновление состояния
			const data = await response.text();
			feedData = parseRSS(data);
			//Обработка ошибок:
			//Универсальная обработка ошибок
			//Сброс флага загрузки в любом случае
		} catch (err) {
			error = err instanceof Error ? err.message : 'Неизвестная ошибка';
			console.error('Произошла ошибка:', err);
		} finally {
			isLoading = false;
		}
	};
	//Жизненный цикл компоненты:
	//Первоначальная загрузка при монтировании
	//Обновление данных каждые 60 секунд
	//Очистка интервала при размонтировании
	onMount(() => {
		loadRSS();
		const interval = setInterval(loadRSS, 60000);
		return () => clearInterval(interval);
	});
</script>

<!--div class="theme-toggle">
  <button on:click={() => document.documentElement.toggleAttribute('data-theme')}>
    {document.documentElement.hasAttribute('data-theme') ? '🌞 Светлая' : '🌙 Тёмная'}
  </button>
</div-->

<!--Условный рендеринг:
Отображение ошибок при их наличии
Цикл для рендеринга элементов фида
-->
{#if error}
	<div class="error">{error}</div>
{/if}

<!-- Глобальные настройки и переменные:
Определение CSS-переменных для единого управления стилями
Импорт кастомных шрифтов Google Fonts
-->
