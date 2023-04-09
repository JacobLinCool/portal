// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	enum Permission {
		Public = 0,
		Private = 1e10,
	}

	export interface Profile {
		blocks: Block[];
	}

	export interface BaseBlock {
		block: string;
		permission: Permission;
	}

	export interface HeadBlock extends BaseBlock {
		block: "head";
		avatar: string;
		display: string;
		description?: string;
	}

	export interface ActionBlock extends BaseBlock {
		block: "action";
		title: string;
		actions: Action[];
	}

	export interface ChatBlock extends BaseBlock {
		block: "chat";
		greeting: string;
		placeholder?: string;
	}

	export type Block = HeadBlock | ActionBlock | ChatBlock | BaseBlock;

	export interface Action {
		display: ActionDisplay;
		handle: ActionHandle;
		description?: string;
	}

	export interface ActionHandle {
		type: "link";
		value: string;
	}

	export interface ActionDisplay {
		icon: string;
		text: string;
		color: string;
		css?: string;
	}
}

export {};
