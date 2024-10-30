import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	const fahrzeug = await pb.collection('Fahrzeug').getOne(params.fahrzeug);

	const auftrag = await pb.collection('Auftrag').getList(1, 50, {
		filter: `FahrzeugID~"${params.fahrzeug}"`
	});
	fahrzeug.auftrag = auftrag;
	return fahrzeug;
}
