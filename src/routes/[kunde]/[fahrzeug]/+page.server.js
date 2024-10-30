import { pb } from '$lib/pocketbase';

export async function load({ params }) {

	const kunde = await pb.collection('Kunde').getOne(params.kunde)

	const fahrzeuge = await pb.collection('Fahrzeug').getOne(params.fahrzeug);

	const fahrzeug = await pb.collection('Fahrzeug').getOne(params.fahrzeug);
// >>>>>>> db475282a08d461639c5226c129974de8e476e7b

	const auftrag = await pb.collection('Auftrag').getList(1, 50, {
		filter: `FahrzeugID~"${params.fahrzeug}"`
	});
	kunde.fahrzeug.auftrag = auftrag;
	return kunde;

	fahrzeug.auftrag = auftrag;
	return fahrzeug;
// >>>>>>> db475282a08d461639c5226c129974de8e476e7b
}
