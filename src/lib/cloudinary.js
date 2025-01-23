import {pb} from '$lib/pocketbase';
// import { updateAuftrag} from '$routes/kunde/fahrzeug/auftrag';
export function openCloudinaryWidgetSchaden(field) {
    let cloudinaryWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'duauohpob',
            uploadPreset: 'Schaden',
        },
        async (error, result) => {
            if (!error && result && result.event === 'success') {
                console.log('Done! Here is the image info: ', result.info.secure_url);
                // await updateAuftrag({ [field]: result.info.secure_url});
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