import { writable } from 'svelte/store';

export const userStore = writable(null);
export const tokenStore = writable(null);

export const cacheStore = writable({});
