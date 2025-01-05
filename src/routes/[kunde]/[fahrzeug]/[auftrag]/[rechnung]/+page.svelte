<script>
	export let data; // Enthält die Kundendaten inklusive Fahrzeug, Auftrag, Rechnung, Arbeitszeit, Ersatzteile und Arbeitswerte
	import logo from '$lib/logo.jpg';

	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	}

	function getGeschlechtBezeichnung(geschlecht) {
		const geschlechtMapping = {
			Männlich: 'Herr', // Männlich
			Weiblich: 'Frau' // Weiblich
		};
		return geschlechtMapping[geschlecht] || 'Kunde'; // Fallback zu 'Kunde', wenn ID nicht bekannt
	}
</script>

<div
	class="p-8 max-w-4xl mx-auto border border-gray-300 bg-white print:max-w-full print:p-0 print:m-0 print:h-[calc(297mm-16px)] overflow-hidden"
>
	<header class="mb-8">
		<div class="flex justify-between items-center">
			<div>
				<h1 class="text-2xl font-bold">LA-KA</h1>
				<p>Tomislav Kamenjasevic</p>
				<p>LA-KA Lack&Karosserie</p>
				<p>Gewerbestraße 11b, 5550 Radstadt</p>
			</div>
			<div class="text-right flex-col item-center">
				<img src={logo} alt="Logo" class="h-28 w-28 rounded-full mr-4" />
				<!-- <div>
					<p class="font-bold">Kontakt</p>
					<p>Gewerbestraße 11b</p>
					<p>5550 Radstadt</p>
					<p>Telefon: +43 6601933616</p>
				</div> -->
			</div>
		</div>
	</header>

	<main class="print:h-[calc(297mm-40px)]">
		<section class="mb-4">
			<div class="flex justify-between">
				<div>
					<p>{getGeschlechtBezeichnung(data.Geschlecht)} {data.Vorname} {data.Nachname}</p>
					<p>{data.Strasse}</p>
					<p>{data.PLZ} {data.Ort}</p>
				</div>
				<div>
					<div>
						<p class="font-bold">Kontakt</p>
						<p>Gewerbestraße 11b</p>
						<p>5550 Radstadt</p>
						<p>Telefon: +43 6601933616</p>
					</div>
					<!-- abstand  -->

					<div class="mt-4">
						<p><strong>Rechnungs-Nr.:</strong> {data.rechnung.Rechnungsnummer}</p>
						<p><strong>Datum:</strong> {formatDate(data.auftrag.created)}</p>
						<p><strong>Liefer-/Leistungsdatum:</strong> {formatDate(data.rechnung.created)}</p>
						<p><strong>Kunden-Nr.:</strong> {data.Kundennr}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="mb-4 flex-grow">
			<h2 class="text-lg font-semibold">Fahrzeugdaten</h2>
			<table class="w-full border-collapse border border-gray-300 text-sm print:break-inside-avoid">
				<tbody>
					<tr>
						<td class="border border-gray-300 p-2"><strong>Marke:</strong></td>
						<td class="border border-gray-300 p-2">{data.fahrzeuge.Marke}</td>
						<td class="border border-gray-300 p-2"><strong>Nat. Code:</strong></td>
						<td class="border border-gray-300 p-2">{data.fahrzeuge.Nat_Code}</td>
						<td class="border border-gray-300 p-2"><strong>F.-Id.-Nr:</strong></td>
						<td class="border border-gray-300 p-2">{data.fahrzeuge.FIN}</td>
					</tr>
					<tr>
						<td class="border border-gray-300 p-2"><strong>Modell:</strong></td>
						<td class="border border-gray-300 p-2">{data.fahrzeuge.Modell}</td>
						<td class="border border-gray-300 p-2"><strong></strong></td>
						<td class="border border-gray-300 p-2"></td>
						<td class="border border-gray-300 p-2"><strong>§57a(Pickerl):</strong></td>
						<td class="border border-gray-300 p-2">{formatDate(data.fahrzeuge.Pickerl)}</td>
					</tr>
					<tr>
						<td class="border border-gray-300 p-2"><strong>Kennzeichen:</strong></td>
						<td class="border border-gray-300 p-2">{data.fahrzeuge.Kennzeichen}</td>
						<td class="border border-gray-300 p-2"><strong>EZ:</strong></td>
						<td class="border border-gray-300 p-2">{formatDate(data.fahrzeuge.Erstzulassung)}</td>
						<td class="border border-gray-300 p-2"><strong>Km-Stand:</strong></td>
						<td class="border border-gray-300 p-2">{data.fahrzeuge.KMStand}</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2 class="text-lg font-semibold mb-4">Rechnung</h2>
			<table class="w-full border-collapse border border-gray-300 text-sm">
				<thead>
					<tr class="bg-gray-200">
						<th class="border border-gray-300 p-2 text-left">Pos. Nummer</th>
						<th class="border border-gray-300 p-2 text-left">Bezeichnung/Beschreibung</th>
						<th class="border border-gray-300 p-2 text-right">Menge</th>
						<th class="border border-gray-300 p-2 text-right">Einheit</th>
						<th class="border border-gray-300 p-2 text-right">E-Preis</th>
						<th class="border border-gray-300 p-2 text-right">Ges. Preis</th>
					</tr>
				</thead>
				<tbody>
					{#each data.ersatzteile.items as ersatzteil, index}
						<tr>
							<td class="border border-gray-300 p-2">{index + 1}</td>
							<td class="border border-gray-300 p-2">{ersatzteil.Bezeichnung}</td>
							<td class="border border-gray-300 p-2 text-right">{ersatzteil.Menge}</td>
							<td class="border border-gray-300 p-2 text-right">Stk.</td>
							<td class="border border-gray-300 p-2 text-right">{ersatzteil.VK_PreisNetto} €</td>
							<td class="border border-gray-300 p-2 text-right">{ersatzteil.Nettosumme} €</td>
						</tr>
					{/each}
					{#each data.arbeitszeit as arbeitszeit, index}
						<tr>
							<td class="border border-gray-300 p-2">{data.ersatzteile.items.length + index + 1}</td
							>
							<td class="border border-gray-300 p-2"
								>{arbeitszeit.expand.ArbeitswerteID.Leistungsbezeichnung}</td
							>
							<td class="border border-gray-300 p-2 text-right">{arbeitszeit.Menge}</td>
							<td class="border border-gray-300 p-2 text-right">Std.</td>
							<td class="border border-gray-300 p-2 text-right"
								>{arbeitszeit.expand.ArbeitswerteID.AwPreis} €</td
							>
							<td class="border border-gray-300 p-2 text-right">{arbeitszeit.Nettosumme} €</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<div class="mt-4 flex justify-end">
				<div>
					<p class="text-right"><strong>Nettosumme:</strong> {data.rechnung.nettosumme} €</p>
					<p class="text-right"><strong>Mehrwertsteuer:</strong> {data.rechnung.mwst} €</p>
					<p class="text-right font-bold">
						<strong>Gesamtbetrag:</strong>
						{data.rechnung.gesamtbetrag} €
					</p>
				</div>
			</div>
		</section>
	</main>
</div>
