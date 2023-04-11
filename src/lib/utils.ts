export function rgb2hsl(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
	return [
		60 * h < 0 ? 60 * h + 360 : 60 * h,
		100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
		(100 * (2 * l - s)) / 2,
	];
}

export function get_browser(): string {
	if (getComputedStyle(document.body).getPropertyValue("--arc-palette-background")) {
		return "Arc";
	} else if (
		(navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) !== -1
	) {
		return "Opera";
	} else if (navigator.userAgent.indexOf("Edg") !== -1) {
		return "Edge";
	} else if (navigator.userAgent.indexOf("Chrome") !== -1) {
		return "Chrome";
	} else if (navigator.userAgent.indexOf("Safari") !== -1) {
		return "Safari";
	} else if (navigator.userAgent.indexOf("Firefox") !== -1) {
		return "Firefox";
	} else {
		return "Unknown";
	}
}

let fingerprint_cached: number | undefined;
export async function fingerprint(): Promise<number> {
	if (fingerprint_cached) {
		return fingerprint_cached;
	}

	const fp = await import("@fingerprintjs/fingerprintjs").then((f) =>
		f.load({ monitoring: false }),
	);

	const result = await fp.get();

	let hash = 0; // 0 ~ 16777215
	for (let i = 0; i < result.visitorId.length; i++) {
		hash = ((hash << 5) + result.visitorId.charCodeAt(i)) % (1 << 24);
	}
	console.log(hash);

	fingerprint_cached = hash;
	return hash;
}
