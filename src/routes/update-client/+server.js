import { pb } from '$lib/pocketbase';

export async function PUT({ request }) {
	try {
		const { action, ...data } = await request.json();

		// update Kunde
		if (action === 'updateKunde') {
			if (!data.updateKundenid) {
				return new Response(JSON.stringify({ error: 'Kunden-ID fehlt' }), { status: 400 });
			}
			// updateData wird mit den Daten befüllt, die übergeben wurden
			const updateData = {};
			if (data.updateKundennr) updateData.Kundennr = data.updateKundennr;
			if (data.updateFirma) updateData.Firma = data.updateFirma;
			if (data.updateVorname) updateData.Vorname = data.updateVorname;
			if (data.updateNachname) updateData.Nachname = data.updateNachname;
			if (data.updateEmail) updateData.EMail = data.updateEmail;
			if (data.updateTelefonnr) updateData.Telefonnr = data.updateTelefonnr;
			if (data.updateStrasse) updateData.Strasse = data.updateStrasse;
			if (data.updatePlz) updateData.PLZ = data.updatePlz;
			if (data.updateOrt) updateData.Ort = data.updateOrt;
			if (data.updateGeschlecht) updateData.Geschlecht = data.updateGeschlecht;

			// update wird durchgeführt
			const response = await pb.collection('Kunde').update(data.updateKundenid, updateData);
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}
		// update Fahrzeug
		if (action === 'updateFahrzeug') {
			if (!data.updateFahrzeugid) {
				return new Response(JSON.stringify({ error: 'Fahrzeug-ID fehlt' }), { status: 400 });
			}
			// updateData wird mit den Daten befüllt, die übergeben wurden
			const updateData = {};
			if (data.updateKennzeichen) updateData.Kennzeichen = data.updateKennzeichen;
			if (data.updateFIN) updateData.FIN = data.updateFIN;
			if (data.updateNatCode) updateData.Nat_Code = data.updateNatCode;
			if (data.updateMarke) updateData.Marke = data.updateMarke;
			if (data.updateModell) updateData.Modell = data.updateModell;
			if (data.updateErstzulassung) updateData.Erstzulassung = data.updateErstzulassung;
			if (data.updateKmStand) updateData.KMStand = data.updateKMStand;
			if (data.updateHubraum) updateData.Hubraum = data.updateHubraum;
			if (data.updateKw) {
				updateData.KW = data.updateKw;
				updateData.PS = Math.round(data.updateKw * 1.36);
			};
			if (data.updatePickerl) updateData.Pickerl = data.updatePickerl;
			if (data.updateZulassungsschein) updateData.Zulassungsschein = data.updateZulassungsschein;
			if (data.updateKundenid) updateData.KundenID = data.updateKundenID;
			if (data.updateFarbcode) updateData.Farbcode = data.updateFarbcode;
			if (data.updateMotorcode) updateData.Motorcode = data.updateMotorcode;
			if (data.updateKraftstoff) updateData.Kraftstoff = data.updateKraftstoff;
			// update wird durchgeführt
			const response = await pb.collection('Fahrzeug').update(data.updateFahrzeugid, updateData);
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}
		// update Auftrag
		if (action === 'updateAuftrag') {
			if (!data.updateAuftragid) {
				return new Response(JSON.stringify({ error: 'Kunden-ID fehlt' }), { status: 400 });
			}
			// updateData wird mit den Daten befüllt, die übergeben wurden
			const updateData = {};
			if (data.updateArbeiten) updateData.Arbeiten = data.updateArbeiten;
			if (data.updateBildSchaden) updateData.BildSchaden = data.updateBildSchaden;
			if (data.updateBildFertig) updateData.BildFertig = data.updateBildFertig;
			if (data.updateFahrzeugid) updateData.FahrzeugID = data.updateFahrzeugid;
			if (data.updateAuftragnr) updateData.Auftragnummer = data.updateAuftragnr;
			// update wird durchgeführt
			const response = await pb.collection('Auftrag').update(data.updateAuftragid, updateData);
			return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
		}
		return new Response('Unknown action', { status: 400 });
	} catch (error) {
		return new Response(error.message, { status: 500 });
	}
}
