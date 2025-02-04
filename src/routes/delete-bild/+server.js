import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: 'duauohpob',
	api_key: '136329848137525',
	api_secret: 'gnLNVnqFcwIHnwHjh2dmz15x0GQ'
});
export async function POST({ request }) {
    try {
        const { publicId } = await request.json();
        if (!publicId) {
            return new Response(JSON.stringify({ error: "Keine `public_id` angegeben" }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log("Lösche Bild mit public_id:", publicId);

        // Bild von Cloudinary löschen
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
            throw new Error("Fehler beim Löschen in Cloudinary: " + result.result);
        }

        return new Response(JSON.stringify({ success: true, result }), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
        return new Response(JSON.stringify({ error: "Fehler beim Löschen des Bildes" }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
