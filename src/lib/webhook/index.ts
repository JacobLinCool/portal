import { discord } from "./discord";
import { fingerprint } from "$lib/utils";
import { browser } from "$app/environment";

const targets = new Set<string>();
let on: string | undefined;

export function setup(webhooks?: string[], location?: string) {
	targets.clear();
	if (webhooks) {
		for (const webhook of webhooks) {
			try {
				const url = new URL(webhook);
				if (url.protocol === "https:") {
					targets.add(url.href);
				}
			} catch {
				// Ignore
			}
		}
	}

	on = location;
}

export async function hook(event: string, data: Record<string, any> = {}): Promise<void> {
	if (!on) {
		return;
	}

	const visitor = await fingerprint();

	try {
		const body = { on, event, data, visitor };

		const promises = [];
		for (const target of targets) {
			if (["discord.com", "canary.discord.com"].includes(new URL(target).hostname)) {
				promises.push(discord(target, body));
			} else {
				promises.push(
					fetch(target, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(body),
					}),
				);
			}
		}

		await Promise.all(promises);
	} catch {
		// Ignore
	}
}

class Triggered {
	private db: IDBDatabase | null = null;
	private fallback = new Set<string>();
	private readonly db_name = "triggered";
	private readonly store_name = "keys";

	constructor() {
		this.ready();
	}

	async ready(): Promise<void> {
		if (!browser || this.db) {
			return;
		}

		return new Promise((resolve, reject) => {
			const request = this.idb().open(this.db_name);

			request.onerror = () => {
				resolve();
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve();
			};

			request.onupgradeneeded = () => {
				const db = request.result;
				db.createObjectStore(this.store_name, { keyPath: "key" });
			};
		});
	}

	async add(key: string): Promise<void> {
		if (!this.db) {
			this.fallback.add(key);
			return;
		}

		return new Promise((resolve, reject) => {
			if (!this.db) {
				reject();
				return;
			}

			const transaction = this.db.transaction([this.store_name], "readwrite");
			const store = transaction.objectStore(this.store_name);
			const request = store.add({ key });

			request.onerror = () => {
				reject();
			};

			request.onsuccess = () => {
				resolve();
			};
		});
	}

	async has(key: string): Promise<boolean> {
		if (!this.db) {
			return this.fallback.has(key);
		}

		return new Promise((resolve, reject) => {
			if (!this.db) {
				reject();
				return;
			}

			const transaction = this.db.transaction([this.store_name], "readonly");
			const store = transaction.objectStore(this.store_name);
			const request = store.get(key);

			request.onerror = () => {
				reject();
			};

			request.onsuccess = () => {
				resolve(!!request.result);
			};
		});
	}

	async clear(): Promise<void> {
		if (!this.db) {
			await this.ready();
		}

		return new Promise((resolve, reject) => {
			if (!this.db) {
				reject();
				return;
			}

			const transaction = this.db.transaction([this.store_name], "readwrite");
			const store = transaction.objectStore(this.store_name);
			const request = store.clear();

			request.onerror = () => {
				reject();
			};

			request.onsuccess = () => {
				resolve();
			};
		});
	}

	idb(): IDBFactory {
		return (
			// @ts-expect-error - prefixed implementations
			window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
		);
	}
}

const triggered = new Triggered();

export async function hook1(event: string, data: Record<string, any> = {}): Promise<void> {
	await triggered.ready();

	const key = `${on}#${event}#${JSON.stringify(data)}`;
	if (!on || (await triggered.has(key))) {
		return;
	}

	await triggered.add(key);
	await hook(event, data);
}
