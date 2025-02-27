import { writable } from 'svelte/store';

interface Settings {
    layout: 'vertical' | 'two-columns' | 'grid';
    showAnimations: boolean;
}

const defaultSettings: Settings = {
    layout: 'vertical',
    showAnimations: true,
};

let initialSettings: Settings = defaultSettings;

if (typeof window !== 'undefined') {
    const storedSettings = localStorage.getItem('settings');
    initialSettings = storedSettings ? JSON.parse(storedSettings) : defaultSettings;
}

export const settings = writable(initialSettings);

settings.subscribe((value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('settings', JSON.stringify(value));
    }
});