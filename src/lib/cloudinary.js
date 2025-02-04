import { pb } from '$lib/pocketbase';

export function openCloudinaryWidget(auftragsId, fototyp) {
	if (!window.cloudinary) {
		console.error('Cloudinary ist nicht geladen.');
		return;
	}
	let cloudinaryWidget = cloudinary.createUploadWidget(
		{
			cloudName: 'duauohpob',
			uploadPreset: 'bilder'
		},
		async (error, result) => {
			if (error) {
				console.error('Cloudinary Upload Fehler:', error);
				return;
			}
			if (result && result.event === 'success') {
				console.log('Bild erfolgreich hochgeladen: ', result.info);

				// Datei in der Datenbank speichern (falls gewünscht)
				try {
					const data = {
						URL: result.info.secure_url,
						AuftragID: auftragsId,
						Fototyp: fototyp,
						Public_id: result.info.public_id
					};

					const record = await pb.collection('Datei').create(data);
					console.log('Datei in der DB gespeichert:', record);
					// location.reload();
				} catch (dbError) {
					console.error('Fehler beim Speichern des Bildes in der DB:', dbError);
				}
			}
		}
	);
	cloudinaryWidget.open();
}

