import { pb } from '$lib/pocketbase';
// import { updateAuftrag} from '$routes/kunde/fahrzeug/auftrag';


export function openCloudinaryWidget(auftragsId, fototyp) {
	if (!window.cloudinary) {
		console.error('Cloudinary ist nicht geladen.');
		return;
	}
	let cloudinaryWidget = cloudinary.createUploadWidget(
		{
			cloudName: 'duauohpob',
			uploadPreset: 'Schaden'
		},
		async (error, result) => {
			if (error) {
				console.error('Cloudinary Upload Fehler:', error);
				return;
			}
			if (result && result.event === 'success') {
				console.log('Bild erfolgreich hochgeladen: ', result.info.secure_url);

				// Datei in der Datenbank speichern (falls gewünscht)
				try {
					const data = {
						"URL": result.info.secure_url,
						"AuftragID": auftragsId,
						"Fototyp": fototyp
					};
					
					const record = await pb.collection('Datei').create(data);
				} catch (dbError) {
					console.error('Fehler beim Speichern des Bildes in der DB:', dbError);
				}
			}
		}
	);
	cloudinaryWidget.open();
}

