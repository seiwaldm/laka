import { pb } from '$lib/pocketbase';

export async function load() {
	const kunden = await pb.collection('Kunde').getFullList({
		sort: '-updated'
	});

	return {
		kunden
	};
}
