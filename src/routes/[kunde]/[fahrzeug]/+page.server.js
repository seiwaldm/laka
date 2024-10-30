import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);

	const auftrag = await pb.collection('Auftrag').getList(1, 50, {
		filter: `FahrzeugID~"${params.fahrzeug}"`
	});
	fahrzeuge.auftrag = auftrag;
	return fahrzeuge;
}
