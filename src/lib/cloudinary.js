import { pb } from '$lib/pocketbase';
// import { updateAuftrag} from '$routes/kunde/fahrzeug/auftrag';

let url = '';
let auftragid = '';
let dateidetailid = '';

export function openCloudinaryWidgetSchaden(field) {
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

				// Speichere die URL in der Variablen
				url = result.info.secure_url;

				// Datei in der Datenbank speichern (falls gewünscht)
				try {
					await createDatei({ URL: url });
					console.log('Bild in DB gespeichert:', url);
				} catch (dbError) {
					console.error('Fehler beim Speichern des Bildes in der DB:', dbError);
				}
			}
		}
	);
	cloudinaryWidget.open();
}

export function openCloudinaryWidgetFertig() {
	let cloudinaryWidget = cloudinary.createUploadWidget(
		{
			cloudName: 'duauohpob',
			uploadPreset: 'Fertig'
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
			}
		}
	);

	cloudinaryWidget.open();
}

export function openCloudinaryWidgetLieferschein() {
	let cloudinaryWidget = cloudinary.createUploadWidget(
		{
			cloudName: 'duauohpob',
			uploadPreset: 'Lieferschein'
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
			}
		}
	);

	cloudinaryWidget.open();
}

export function openCloudinaryWidgetAuftrag() {
	let cloudinaryWidget = cloudinary.createUploadWidget(
		{
			cloudName: 'duauohpob',
			uploadPreset: 'Auftrag'
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
			}
		}
	);

	cloudinaryWidget.open();
}

export function openCloudinaryWidgetRechnung() {
	let cloudinaryWidget = cloudinary.createUploadWidget(
		{
			cloudName: 'duauohpob',
			uploadPreset: 'Rechnung'
		},
		(error, result) => {
			if (!error && result && result.event === 'success') {
				console.log('Done! Here is the image info: ', result.info);
			}
		}
	);

	cloudinaryWidget.open();
}
