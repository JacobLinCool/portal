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
		background?: string;
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
		share?: boolean;
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

	export interface CarouselBlock extends BaseBlock {
		block: "carousel";
		title: string;
		items: CarouselItem[];
		autoplay?: number;
	}

	export interface IframeBlock extends BaseBlock {
		block: "iframe";
		src: string;
		height?: number;
		width?: number;
	}

	export type Block =
		| HeadBlock
		| ActionBlock
		| ChatBlock
		| CarouselBlock
		| IframeBlock
		| BaseBlock;

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

	export interface CarouselItem {
		image: string;
		link?: string;
	}
}

export {};
