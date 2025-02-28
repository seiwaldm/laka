import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	// Kunde abrufen
	const kunde = await pb.collection('Kunde').getOne(params.kunde);
	// Fahrzeug abrufen
	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);

	// Hubraum berechnen: KW * 1.36 (aufrunden bei ungeraden Zahlen)
	fahrzeuge.PS = Math.ceil(fahrzeuge.KW * 1.36);

	// Aufträge abrufen
	const auftrag = await pb.collection('Auftrag').getList(1, 50, {
		filter: `FahrzeugID~"${params.fahrzeug}"`
	});

	const ersatzteile = await pb.collection('Ersatzteile').getList(1, 50, {
    });

    const arbeitszeit = await pb.collection('Arbeitszeit').getList(1, 50, {
    });

	kunde.fahrzeuge = fahrzeuge;
	kunde.auftrag = auftrag;
	kunde.ersatzteile = ersatzteile;
	kunde.arbeitszeit = arbeitszeit;
	return kunde;
}
