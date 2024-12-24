export function openCloudinaryWidgetSchaden() {
    let cloudinaryWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'duauohpob',
            uploadPreset: 'Schaden'
        },
        (error, result) => {
            if (!error && result && result.event === 'success') {
                console.log('Done! Here is the image info: ', result.info);
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

export function openCloudinaryWidgetSonstiges() {
    let cloudinaryWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'duauohpob',
            uploadPreset: 'Sonstiges'
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