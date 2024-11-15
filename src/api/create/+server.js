import PocketBase from 'pocketbase';

const pb = new PocketBase('https://laka.seiwald.club/');

export async function POST({ request, cookies }) {
	const kundenDaten = await request.json();
	const vorname = cookies.get('vorname');

	const response = await pb.collection('Kunden').create({
		Vorname: kundenDaten.vorname
	});
}
