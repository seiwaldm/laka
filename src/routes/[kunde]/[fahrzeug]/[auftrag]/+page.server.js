import { pb } from '$lib/pocketbase';


export async function load({ params }) {
	// Kunde abrufen
	const kunde = await pb.collection('Kunde').getOne(params.kunde);
	// Fahrzeug abrufen
	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);
	// Auftrag abrufen
	const auftrag = await pb.collection('Auftrag').getOne(params.auftrag);
	// Rechnung abrufen
	// const rechnung = await pb.collection('Rechnung').getList(1, 50, {
	// 	filter: `AuftragID~"${params.auftrag}"`
	// })
	
	const arbeitszeit = await pb.collection('Arbeitszeit').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`
	})

	const ersatzteile = await pb.collection('Ersatzteile').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`
	})

	const arbeitswerte = await pb.collection('Arbeitswerte').getFullList()
	;

	kunde.fahrzeuge = fahrzeuge;
	kunde.auftrag = auftrag;
	// kunde.rechnung = rechnung;
	kunde.arbeitszeit = arbeitszeit;
	kunde.ersatzteile = ersatzteile;
	kunde.arbeitswerte = arbeitswerte;
	return kunde;
}
