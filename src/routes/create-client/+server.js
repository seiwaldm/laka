import { pb } from '$lib/pocketbase';

export async function POST({ request }) {
	try {
		const { action, ...data } = await request.json();

		if (action === 'createKunde') {
			// const kundenDaten = await request.json();

			if (!data.vorname) {
				return new Response('Vorname fehlt', { status: 400 });
			}
			if (!data.nachname) {
				return new Response('Nachname fehlt', { status: 400 });
			}
			if (!data.telefonnummer) {
				return new Response('Telefonnummer fehlt', { status: 400 });
			}

			const response = await pb.collection('Kunde').create({
				Vorname: data.vorname,
				Nachname: data.nachname,
				EMail: data.email,
				Telefonnr: data.telefonnummer,
				Strasse: data.strasse,
				Ort: data.ort
			});

			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}

		if (action === 'createFahrzeug') {
			// const fahrzeugDaten = await request.json();

			if (!data.kennzeichen) {
				return new Response('Marke fehlt', { status: 400 });
			}

			if (!data.marke) {
				return new Response('Marke fehlt', { status: 400 });
			}

			if (!data.modell) {
				return new Response('Marke fehlt', { status: 400 });
			}

			const response = await pb.collection('Fahrzeug').create({
				Kennzeichen: data.kennzeichen,
				Marke: data.marke,
				Modell: data.modell,
				Erstzulassung: data.erstzulassung,
				Zulassungsschein: data.zulassungsschein,
				KundenID: data.kundenid
			});
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}

		if (action === 'createAuftrag') {
			if (!data.arbeiten) {
				return new Response('Arbeiten fehlen', { status: 400 });
			}

			const response = await pb.collection('Auftrag').create({
				Arbeiten: data.arbeiten,
				BildSchaden: data.bildSchaden,
				BildFertig: data.bildFertig,
				Rechnung: data.rechnung,
				FahrzeugID: data.fahrzeugid
			});
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}

		return new Response('Action not found', { status: 400 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}

// export async function POST({ request }) {
// 	try {
// 		const fahrzeugDaten = await request.json();

// 		if (!fahrzeugDaten.marke) {
// 			return new Response('Marke fehlt', { status: 400 });
// 		}
// 		const response = await pb.collection('Fahrzeug').create({
// 			Marke: fahrzeugDaten.marke
// 		});
// 		return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
// 	} catch (error) {
// 		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
// 	}
// }
