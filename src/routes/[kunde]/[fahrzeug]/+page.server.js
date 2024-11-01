import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	const kunde = await pb.collection('Kunde').getOne(params.kunde);

	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);

	const auftrag = await pb.collection('Auftrag').getList(1, 50, {
		filter: `FahrzeugID~"${params.fahrzeug}"`
	});

	kunde.fahrzeuge = fahrzeuge;
	kunde.auftrag = auftrag;
	return kunde;
}
