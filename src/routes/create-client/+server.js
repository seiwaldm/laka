import { pb } from '$lib/pocketbase';
import { parse } from 'svelte/compiler';

export async function POST({ request }) {
	try {
		const { action, ...data } = await request.json();

		// Kunde erstellen
		if (action === 'createKunde') {
			// überprüfe ob vorname und nachname vorhanden sind
			if (!data.vorname) {
				return new Response('Vorname fehlt', { status: 400 });
			}
			if (!data.nachname) {
				return new Response('Nachname fehlt', { status: 400 });
			}
			// sortieren nach der Kundennummer
			const kunden = await pb.collection('Kunde').getFullList({ sort: '-Kundennr' });
			// letzte Kundennummer wird ermittelt
			const letzteKundennummer =
				kunden
					.map((kunde) => parseInt(kunde.Kundennr.split('-')[1], 10))
					.filter((num) => !isNaN(num))
					.sort((a, b) => b - a)[0] || 1000;
			// neue Kundennummer wird erstellt
			const neueKundennummer = `K-${letzteKundennummer + 1}`;

			// Kunde wird erstellt
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

		// Fahrzeug erstellen
		if (action === 'createFahrzeug') {
			// const fahrzeugDaten = await request.json();
			// überprüfe ob Kennzeichen, Marke und Modell vorhanden sind
			if (!data.kennzeichen) {
				return new Response('Marke fehlt', { status: 400 });
			}

			if (!data.marke) {
				return new Response('Marke fehlt', { status: 400 });
			}

			if (!data.modell) {
				return new Response('Marke fehlt', { status: 400 });
			}
			let ps = null;
			if (data.kw) {
				ps = Math.round(data.kw * 1.36); // Umrechnung von kW in PS
			}
			// Fahrzeug wird erstellt
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
				PS: ps,
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
		// Auftrag erstellen
		if (action === 'createAuftrag') {
			// überprüfe ob Arbeiten vorhanden sind
			if (!data.arbeiten) {
				return new Response('Arbeiten fehlen', { status: 400 });
			}

			// sortieren nach der Auftragsnummer
			const auftrag = await pb.collection('Auftrag').getFullList({ sort: '-Auftragnummer' });

			// letzte Auftragsnummer wird ermittelt
			const letzteAuftragnummer =
				auftrag
					.map((auftrag) => parseInt(auftrag.Auftragnummer.split('-')[1], 10))
					.filter((num) => !isNaN(num))
					.sort((a, b) => b - a)[0] || 1000;
			// neue Auftragsnummer wird erstellt
			const neueAuftragnummer = `A-${letzteAuftragnummer + 1}`;

			// Auftrag wird erstellt
			const response = await pb.collection('Auftrag').create({
				Arbeiten: data.arbeiten,
				Infotext: data.infotext,
				BildSchaden: data.bildSchaden,
				BildFertig: data.bildFertig,
				Rechnung: data.rechnung,
				Auftragnummer: neueAuftragnummer,
				FahrzeugID: data.fahrzeugid
			});
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}
		// Arbeitszeit erstellen
		if (action === 'createErsatzteil') {
			// überprüfe ob Arbeiten vorhanden sind
			if (!data.ersatzteilBezeichnung) {
				return new Response('Arbeiten fehlen', { status: 400 });
			}
			// if (!data.ersatzteilMenge) {
			// 	return new Response('Arbeiten fehlen', { status: 400 });
			// }

			// berechnung der Marge
			let marge = 0;
			if (data.ersatzteilEKPreis && data.ersatzteilVKPreisNetto) {
				marge = parseFloat(
					((data.ersatzteilVKPreisNetto - data.ersatzteilEKPreis) / data.ersatzteilVKPreisNetto) *
						100
				).toFixed(2);
			}

			// berechnung des Bruttoverkaufspreises
			let verkaufspreisBrutto = 0;
			if (data.ersatzteilVKPreisNetto) {
				verkaufspreisBrutto = parseFloat(data.ersatzteilVKPreisNetto * 1.2).toFixed(2);
			}

			// //berechne die Nettosumme
			let nettosumme = 0;
			if (data.ersatzteilMenge && data.ersatzteilVKPreisNetto && data.ersatzteilRabatt) {
				nettosumme =
					((data.ersatzteilVKPreisNetto * (100 - data.ersatzteilRabatt)) / 100) *
					data.ersatzteilMenge;
				nettosumme = parseFloat(nettosumme.toFixed(2));
			}

			let bruttosumme = 0;
			if (data.ersatzteilMenge && data.ersatzteilVKPreisNetto && data.ersatzteilRabatt) {
				bruttosumme =
					((data.ersatzteilVKPreisNetto * (100 - data.ersatzteilRabatt)) / 100) *
					data.ersatzteilMenge * 1.2;
				bruttosumme = parseFloat(bruttosumme.toFixed(2));
			}
			// Auftrag wird erstellt
			const response = await pb.collection('Ersatzteile').create({
				Artikelnummer: data.ersatzteilArtikelnummer,
				Bezeichnung: data.ersatzteilBezeichnung,
				Menge: data.ersatzteilMenge,
				Marge: marge,
				Rabatt: data.ersatzteilRabatt,
				VK_PreisNetto: data.ersatzteilVKPreisNetto,
				EK_PreisNetto: data.ersatzteilEKPreis,
				VK_PreisBrutto: verkaufspreisBrutto,
				Nettosumme: nettosumme,
				Bruttosumme: bruttosumme,
				AuftragID: data.auftragid
			});
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}

		return new Response('Action not found', { status: 400 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
	}
}
