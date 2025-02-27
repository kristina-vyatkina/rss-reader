// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
	  // Интерфейсы для типизации в SvelteKit
	  interface Error {} // Кастомные ошибки
	  interface Locals {} // Данные сервера
	  interface PageData {} // Данные страницы
	  interface PageState {} // Состояние страницы
	  interface Platform {} // Платформа
	}
}

export {};
