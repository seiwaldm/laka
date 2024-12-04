import { pb } from '$lib/pocketbase';

export async function load() {
	const kunden = await pb.collection('Kunde').getFullList({
		sort: 'Nachname'
	});

	for (let kunde of kunden) {
		const fahrzeuge = await pb.collection('Fahrzeug').getFullList({});

		const auftrag = await pb.collection('Auftrag').getFullList({});

		kunde.fahrzeuge = fahrzeuge;
		kunde.auftrag = auftrag;

	}
	return { kunden };
}
