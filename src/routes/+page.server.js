import { pb } from '$lib/pocketbase';

export async function load() {
	const kunden = await pb.collection('Kunde').getFullList({
		sort: 'Nachname'
	});

	return {
		kunden
	};
}

// export async function POST({ request }) {
// 	try {
// 		const kundenDaten = await request.json();

// 		if (!kundenDaten.vorname) {
// 			return new Response('Vorname fehlt', { status: 400 });
// 		}

// 		const response = await pb.collection('Kunde').create({
// 			Vorname: kundenDaten.vorname
// 		});
// 		return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
// 	} catch (error) {
// 		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
// 	}
// }
