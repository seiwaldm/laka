import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	const kunde = await pb.collection('Kunde').getOne(params.kunde);

	
	const auftrag = await pb.collection('Auftrag').getOne(params.auftrag);

	kunde.auftrag = auftrag;
	return kunde;
}
