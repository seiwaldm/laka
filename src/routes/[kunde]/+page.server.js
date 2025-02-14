import { pb } from "$lib/pocketbase"


// wird beim Laden der Seite ausgeführt, der return-Wert steht dann in der Variable data auf der +page.svelte zur Verfügung
export async function load({ params }) {
    //der param kunde muss die ID des Kunden enthalten, um die Daten zum Kunden abzufragen:
    const kunde = await pb.collection('Kunde').getOne(params.kunde)

    //Fahrzeuge abrufen, die dem Kunden zugeordnet sind
    const fahrzeuge = await pb.collection('Fahrzeug').getList(1, 50, {
        filter: `KundenID~"${params.kunde}"`
    });
    //Aufträge abrufen
    const auftrag = await pb.collection('Auftrag').getList(1, 50, {
    });
    // Ersatzteile abrufen
    const ersatzteile = await pb.collection('Ersatzteile').getList(1, 50, {
    });
    // Arbeitszeiten abrufen
    const arbeitszeit = await pb.collection('Arbeitszeit').getList(1, 50, {
    });
    // Datei abrufen
    const datei = await pb.collection('Datei').getList(1, 50, {
    });


    kunde.fahrzeuge = fahrzeuge;
    kunde.auftrag = auftrag;
    kunde.ersatzteile = ersatzteile;
    kunde.arbeitszeit = arbeitszeit;
    kunde.datei = datei;
    return kunde;
}