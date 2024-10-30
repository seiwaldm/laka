import { pb } from '$lib/pocketbase';

export async function load({ params }) {
	const auftrag = await pb.collection('Auftrag').getOne(params.auftrag);

	kunde.auftrag = auftrag;
	return kunde;
}
