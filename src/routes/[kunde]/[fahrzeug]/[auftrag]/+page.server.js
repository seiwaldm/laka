import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	// Kunde abrufen
	const kunde = await pb.collection('Kunde').getOne(params.kunde);
	// Fahrzeug abrufen
	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);
	// Auftrag abrufen
	const auftrag = await pb.collection('Auftrag').getOne(params.auftrag);
	// Rechnung abrufen
	const rechnung = await pb.collection('Rechnung').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`
	});

	kunde.fahrzeuge = fahrzeuge;
	kunde.auftrag = auftrag;
	kunde.rechnung = rechnung;
	return kunde;
}
