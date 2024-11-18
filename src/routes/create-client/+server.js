import { pb } from '$lib/pocketbase';

export async function POST({ request }) {
	try {
		const kundenDaten = await request.json();

		if (!kundenDaten.vorname) {
			return new Response('Vorname fehlt', { status: 400 });
		}
		if (!kundenDaten.nachname) {
			return new Response('Nachname fehlt', { status: 400 });
		}

		const response = await pb.collection('Kunde').create({
			Vorname: kundenDaten.vorname,
			Nachname: kundenDaten.nachname
		});

		return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const fahrzeugDaten = await request.json();

		if (!fahrzeugDaten.marke) {
			return new Response('Marke fehlt', { status: 400 });
		}
		const response = await pb.collection('Fahrzeug').create({
			Marke: fahrzeugDaten.marke
		});
		return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}
