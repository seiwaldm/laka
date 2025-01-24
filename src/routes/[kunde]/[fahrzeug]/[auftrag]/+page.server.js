import { pb } from '$lib/pocketbase';


export async function load({ params }) {
	// Kunde abrufen
	const kunde = await pb.collection('Kunde').getOne(params.kunde);
	// Fahrzeug abrufen
	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);
	// Auftrag abrufen
	const auftrag = await pb.collection('Auftrag').getOne(params.auftrag, {
	});
	// Arbeitszeit abrufen
	const arbeitszeit = await pb.collection('Arbeitszeit').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`,
		expand: 'ArbeitswerteID'
	})
	// Ersatzteile abrufen
	const ersatzteile = await pb.collection('Ersatzteile').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`
	})
	// Rechnung abrufen
	const rechnung = await pb.collection('Rechnung').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`
	})
	// Arbeitswerte abrufen
	const arbeitswerte = await pb.collection('Arbeitswerte').getFullList()
	// Daten abrufen
	const datei = await pb.collection('Datei').getList(1, 50, {
		filter: `AuftragID~"${params.auftrag}"`,
		expand: 'DateidetailID'
	});

	const dateidetails = await pb.collection('Dateidetails').getFullList()

	kunde.fahrzeuge = fahrzeuge;
	kunde.auftrag = auftrag;
	kunde.rechnung = rechnung;
	kunde.arbeitszeit = arbeitszeit;
	kunde.ersatzteile = ersatzteile;
	kunde.arbeitswerte = arbeitswerte;
	kunde.datei = datei;
	kunde.dateidetails = dateidetails;
	return kunde;
}
