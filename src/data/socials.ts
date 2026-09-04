import type { iconPaths } from './icons';

type Social = {
    label: string;
    href: string;
    icon: keyof typeof iconPaths
}

export const socials: Social[] = [
    { label: 'GitHub', href: "https://github.com/tinkerer9", icon: 'github-logo' },
    // { label: 'Arduino', href: "https://forum.arduino.cc/u/makermax101", icon: 'arduino-logo' }
];