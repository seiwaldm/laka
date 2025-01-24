import { pb } from '$lib/pocketbase';

// laden aller wichtigen Daten; es werden alle Kunden, Fahrzeuge und Aufträge geladen, dabei werden die Fahrzeuge und Aufträge den Kunden zugeordnet und somit muss man nicht mehrere Anfragen machen sondern hat alles in einem
export async function load() {
	const kunden = await pb.collection('Kunde').getFullList({
		sort: 'Nachname',
	});

	const fahrzeuge = await pb.collection('Fahrzeug').getFullList();
	const auftragsliste = await pb.collection('Auftrag').getFullList({});
	// const ersatzteile = await pb.collection('Ersatzteile').getFullList({});
	// const arbeitszeit = await pb.collection('Arbeitszeit').getFullList({});

	// kunden.fahrzeuge = fahrzeuge;
	// kunden.auftrag = auftragsliste;
	// kunden.ersatzteile = ersatzteile;
	// kunden.arbeitszeit = arbeitszeit;

	for (let kunde of kunden) {
		kunde.fahrzeuge = fahrzeuge.filter((fahrzeug) => fahrzeug.KundenID === kunde.id);
		for (let fahrzeug of fahrzeuge) {
			fahrzeug.auftrag = auftragsliste.filter((auftrag) => auftrag.FahrzeugID === fahrzeug.id);
		}
		
	}
	return { kunden };
}
