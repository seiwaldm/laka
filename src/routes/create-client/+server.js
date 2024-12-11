import { pb } from '$lib/pocketbase';

export async function POST({ request }) {
	try {
		const { action, ...data } = await request.json();

		if (action === 'createKunde') {
			if (!data.vorname) {
				return new Response('Vorname fehlt', { status: 400 });
			}
			if (!data.nachname) {
				return new Response('Nachname fehlt', { status: 400 });
			}
			const kunden = await pb.collection('Kunde').getFullList({ sort: '-Kundennr' });

			const letzteKundennummer =
				kunden
					.map((kunde) => parseInt(kunde.Kundennr.split('-')[1], 10))
					.filter((num) => !isNaN(num))
					.sort((a, b) => b - a)[0] || 1000;

			const neueKundennummer = `K-${letzteKundennummer + 1}`;

			const response = await pb.collection('Kunde').create({
				Kundennr: neueKundennummer,
				Firma: data.firma,
				Vorname: data.vorname,
				Nachname: data.nachname,
				EMail: data.email,
				Telefonnr: data.telefonnummer,
				Strasse: data.strasse,
				PLZ: data.plz,
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
				FIN: data.fin,
				Nat_Code: data.natCode,
				Marke: data.marke,
				Modell: data.modell,
				Erstzulassung: data.erstzulassung,
				KMStand: data.kmstand,
				Hubraum: data.hubraum,
				KW: data.kw,
				PS: data.ps,
				Pickerl: data.pickerl,
				Zulassungsschein: data.zulassungsschein,
				KundenID: data.kundenid,
				Motorcode: data.motorcode,
				Kraftstoff: data.kraftstoff,
				Tachostand: data.tachostand,
				tatsaechl_Kilometerstand: data.tatKilometer,
				Farbcode: data.farbcode
			});
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}

		if (action === 'createAuftrag') {
			if (!data.arbeiten) {
				return new Response('Arbeiten fehlen', { status: 400 });
			}

			const auftrag = await pb.collection('Auftrag').getFullList({ sort: '-Auftragnummer' });

			const letzteAuftragnummer =
				auftrag
					.map((auftrag) => parseInt(auftrag.Auftragnummer.split('-')[1], 10))
					.filter((num) => !isNaN(num))
					.sort((a, b) => b - a)[0] || 1000;

			const neueAuftragnummer = `K-${letzteAuftragnummer + 1}`;

			const response = await pb.collection('Auftrag').create({
				Arbeiten: data.arbeiten,
				BildSchaden: data.bildSchaden,
				BildFertig: data.bildFertig,
				Rechnung: data.rechnung,
				Auftragnummer: neueAuftragnummer,
				FahrzeugID: data.fahrzeugid
			});
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}

		return new Response('Action not found', { status: 400 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}
