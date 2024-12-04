import { pb } from '$lib/pocketbase';

export async function load() {
	const kunden = await pb.collection('Kunde').getFullList({
		sort: 'Nachname'
	});
	const fahrzeuge = await pb.collection('Fahrzeug').getFullList();
	const auftragsliste = await pb.collection('Auftrag').getFullList({});
	for (let kunde of kunden) {
		for (let fahrzeug of fahrzeuge) {
			fahrzeug.auftrag = auftragsliste.filter((auftrag) => auftrag.FahrzeugID === fahrzeug.id);
		}
		kunde.fahrzeuge = fahrzeuge.filter((fahrzeug) => fahrzeug.KundenID === kunde.id);
	}
	return { kunden };
}
