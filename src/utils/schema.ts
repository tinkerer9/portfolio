import { socials } from "./socials";

interface SchemaProps {
	title: string;
	description: string;
	url: string;
	isHome: boolean;
	isProject: boolean;
}

export function getSchema({
	title,
	description,
	url,
	isHome,
	isProject
}: SchemaProps) {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": "https://maxparisi.me/#person",
				"name": "Max Parisi",
				"url": "https://maxparisi.me",
				"image": "https://maxparisi.me/assets/portrait.jpg",
				"sameAs": socials.map(({ href }) => href)
			},

			...(isHome
				? [
						{
							"@type": "WebSite",
							"@id": "https://maxparisi.me/#website",
							"url": "https://maxparisi.me",
							"name": "Max Parisi",
							"alternateName": "Max Parisi",
							"inLanguage": "en-US",
							"publisher": {
								"@id": "https://maxparisi.me/#person"
							},
							"logo": {
								"@type": "ImageObject",
								"url": "https://maxparisi.me/web-app-manifest-512x512.png"
							}
						}
					]
				: []),

			...(!isHome
				? [
						{
							"@type": "WebPage",
							"@id": url,
							"url": url,
							"name": title,
							"description": description,
							"isPartOf": {
								"@id": "https://maxparisi.me/#website"
							},
							"mainEntity": {
								"@id": "https://maxparisi.me/#person"
							}
						}
					]
				: []),

			...(isProject
				? [
						{
							"@type": "CreativeWork",
							"@id": `${url}#project`,
							"name": title,
							"description": description,
							"url": url,
							"author": {
								"@id": "https://maxparisi.me/#person"
							}
						}
					]
				: [])
		]
	};
}