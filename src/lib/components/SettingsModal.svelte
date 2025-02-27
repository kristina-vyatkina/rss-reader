<script lang="ts">
	export let isOpen: boolean;
	export let layout: 'vertical' | 'two-columns' | 'grid';
	let showAnimations: boolean = true;

	const handleClose = () => {
		isOpen = false; // Меняем пропс напрямую
	};

	const toggleAnimations = () => {
		const html = document.documentElement;
		showAnimations = !showAnimations;
		if (showAnimations) {
			html.removeAttribute('data-no-animations');
		} else {
			html.setAttribute('data-no-animations', '');
		}
	};
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop" on:click|self={handleClose}>
		<div class="modal-content">
			<button class="close-btn" on:click={handleClose}>×</button>
			<h2>⚙️ Настройки отображения</h2>

			<div class="settings-group">
				<h3>Расположение новостей</h3>
				<div class="layout-options">
					<label class:selected={layout === 'vertical'}>
						<input type="radio" name="layout" value="vertical" bind:group={layout} />
						<span>📰 Вертикальный список</span>
					</label>

					<label class:selected={layout === 'grid'}>
						<input type="radio" name="layout" value="grid" bind:group={layout} />
						<span>🧱 Сетка</span>
					</label>
				</div>
			</div>

			<div class="settings-group">
				<label class="toggle">
					<input type="checkbox" checked={showAnimations} on:click={toggleAnimations} />
					<span>🎬 Анимации элементов</span>
				</label>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(3px);
		z-index: 1000;
	}

	.modal-content {
		background: var(--surface);
		padding: 2rem;
		border-radius: var(--border-radius);
		width: 90%;
		max-width: 500px;
		box-shadow: var(--shadow);
	}

	.settings-group {
		margin: 1.5rem 0;
	}

	.layout-options {
		display: grid;
		gap: 1rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem;
		border: 2px solid var(--primary);
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	label.selected {
		border-color: var(--accent);
		background: rgba(var(--primary), 0.1);
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--text);
	}
</style>
