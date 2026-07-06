import type { iconPaths } from './IconPaths';

export const socials: { label: string; href: string; icon: keyof typeof iconPaths }[] = [
	{ label: 'Contact', href: 'mailto:max@maxparisi.me', icon: 'paper-plane-tilt' },
	{ label: 'GitHub', href: 'https://github.com/tinkerer9', icon: 'github-logo' },
];