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

<!-- Button zur Speicherung der Rechnung -->
<div class="flex justify-end mb-4 print:hidden">
	<button
		on:click={() => window.print()}
		class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
	>
		Drucken
	</button>
</div>

<div
	class="min-h-[297mm] flex flex-col justify-between p-10 max-w-4xl mx-auto border border-gray-300 bg-white rounded-lg shadow-md print:max-w-full print:p-0 print:m-0 print:border-0 print:shadow-none"
>
	<div class="p-4">
		<!-- oberster Teil mit Verkäufer daten -->
		<div class="flex justify-between items-center border-b-2 border-gray-300 pb-6">
			<div>
				<h1 class="text-3xl font-bold text-gray-800">Lack und Karosserie Radstadt</h1>
				<p class="text-sm text-gray-600">Gewerbestraße 11b, 5550 Schwemmberg</p>
				<p class="text-sm text-gray-600">Tel: 06601933616 | Email: info@laka.at</p>
			</div>
			<img src={logo} alt="Logo" class="h-28 w-28 rounded-full mr-4" />
		</div>

		<main class="mt-6 flex-grow">
			<section class="mb-10">
				<div class="flex justify-between">
					<div>
						<p class="text-lg text-gray-700 mt-10">
							{getGeschlechtBezeichnung(data.Geschlecht)}
							{data.Vorname}
							{data.Nachname}
						</p>
						<p class="text-gray-600">{data.Strasse}</p>
						<p class="text-gray-600">{data.PLZ} {data.Ort}</p>
					</div>

					<div class="mt-8">
						<p class="text-gray-700">
							<strong>{data.rechnung.Auftragsdokument ? 'Auftrags-Nr.:' : 'Rechnungs-Nr.:'}</strong>
							{data.rechnung.Auftragsdokument
								? data.auftrag.Auftragnummer
								: data.rechnung.Rechnungsnummer}
						</p>
						<p class="text-gray-700"><strong>Datum:</strong> {formatDate(data.auftrag.created)}</p>
						<p class="text-gray-700">
							<strong>Liefer-/Leistungsdatum:</strong>
							{formatDate(data.rechnung.created)}
						</p>
						<p class="text-gray-700"><strong>Kunden-Nr.:</strong> {data.Kundennr}</p>
					</div>
				</div>
			</section>

			<section class="mb-8">
				<h2 class="text-xl font-semibold text-gray-800 mb-4">Fahrzeugdaten</h2>
				<table class="w-full border-collapse border border-gray-300 text-sm">
					<tbody>
						<tr class="whitespace-nowrap">
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"><strong>Marke:</strong></td>
							<td class="border border-gray-300 px-4 py-2">{data.fahrzeuge.Marke || '-'}</td>
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"
								><strong>Nat. Code:</strong></td
							>
							<td class="border border-gray-300 px-4 py-2">{data.fahrzeuge.Nat_Code || '-'}</td>
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"
								><strong>F.-Id.-Nr:</strong></td
							>
							<td class="border border-gray-300 px-4 py-2">{data.fahrzeuge.FIN || '-'}</td>
						</tr><tr class="whitespace-nowrap">
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"><strong>Modell:</strong></td>
							<td class="border border-gray-300 px-4 py-2">{data.fahrzeuge.Modell || '-'}</td>
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"></td>
							<td class="border border-gray-300 px-4 py-2"></td>
							<td class="whitespace-nowrap border border-gray-300 px-4 py-2 bg-gray-100"
								><strong>§57a (Pickerl):</strong></td
							>
							<td class="whitespace-nowrap border border-gray-300 px-4 py-2"
								>{data.fahrzeuge.Pickerl ? formatDate(data.fahrzeuge.Pickerl) : '-'}</td
							>
						</tr>
						<tr class="whitespace-nowrap">
							<td class="border border-gray-300 px-4 py-2 bg-gray-50"
								><strong>Kennzeichen:</strong></td
							>
							<td class="whitespace-nowrap border border-gray-300 px-4 py-2"
								>{data.fahrzeuge.Kennzeichen || '-'}</td
							>
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"><strong>EZ:</strong></td>
							<td class="border border-gray-300 px-4 py-2"
								>{data.fahrzeuge.Erstzulassung ? formatDate(data.fahrzeuge.Erstzulassung) : '-'}</td
							>
							<td class="border border-gray-300 px-4 py-2 bg-gray-100"
								><strong>Km-Stand:</strong></td
							>
							<td class="border border-gray-300 px-4 py-2">{data.fahrzeuge.KMStand || '-'}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-800 mb-4">
					{data.rechnung.Auftragsdokument ? 'Auftrag' : 'Rechnung'}
				</h2>
				<table class="w-full border-collapse border border-gray-300 text-sm">
					<thead>
						<tr class="whitespace-nowrap bg-gray-200 text-gray-700">
							<th class="whitespace-nowrap border border-gray-300 px-4 py-2 text-left"
								>Pos. Nummer</th
							>
							<th class="whitespace-nowrap border border-gray-300 px-4 py-2 text-left"
								>Bezeichnung/Beschreibung</th
							>
							<th class="whitespace-nowrap border border-gray-300 px-4 py-2 text-right">Menge</th>
							<th class="whitespace-nowrap border border-gray-300 px-4 py-2 text-right">Einheit</th>
							<th class="whitespace-nowrap border border-gray-300 px-4 py-2 text-right">E-Preis</th>
							<th class="whitespace-nowrap border border-gray-300 px-4 py-2 text-right"
								>Ges. Preis</th
							>
						</tr>
					</thead>
					<tbody>
						{#each data.ersatzteile.items as ersatzteil, index}
							<tr class="odd:bg-white even:bg-gray-50">
								<td class="border border-gray-300 px-4 py-2">{index + 1}</td>
								<td class="border border-gray-300 px-4 py-2">{ersatzteil.Bezeichnung}</td>
								<td class="border border-gray-300 px-4 py-2 text-right">{ersatzteil.Menge}</td>
								<td class="border border-gray-300 px-4 py-2 text-right">Stk.</td>
								<td class="border border-gray-300 px-4 py-2 text-right"
									>{ersatzteil.VK_PreisNetto} €</td
								>
								<td class="border border-gray-300 px-4 py-2 text-right"
									>{ersatzteil.Nettosumme} €</td
								>
							</tr>
						{/each}
						{#each data.arbeitszeit as arbeitszeit, index}
							<tr class="odd:bg-white even:bg-gray-50">
								<td class="border border-gray-300 px-4 py-2"
									>{data.ersatzteile.items.length + index + 1}</td
								>
								<td class="border border-gray-300 px-4 py-2"
									>{arbeitszeit.expand.ArbeitswerteID.Leistungsbezeichnung}</td
								>
								<td class="border border-gray-300 px-4 py-2 text-right">{arbeitszeit.Menge}</td>
								<td class="border border-gray-300 px-4 py-2 text-right">Std.</td>
								<td class="border border-gray-300 px-4 py-2 text-right"
									>{arbeitszeit.expand.ArbeitswerteID.AwPreis} €</td
								>
								<td class="border border-gray-300 px-4 py-2 text-right"
									>{arbeitszeit.Nettosumme} €</td
								>
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="mt-6 flex justify-end">
					<div>
						<p class="text-lg text-right text-gray-700">
							<strong>Nettosumme:</strong>
							{data.rechnung.Nettosumme} €
						</p>
						<p class="text-lg text-right text-gray-700">
							<strong>Umsatzsteuer:</strong>
							{data.rechnung.Umsatzsteuer} €
						</p>
						<p class="text-lg text-right text-gray-800 font-bold">
							<strong>Gesamtbetrag:</strong>
							{data.rechnung.Bruttosumme} €
						</p>
					</div>
				</div>
			</section>
		</main>
	</div>
	<p class="text-center text-gray-600 text-lg mt-4 mb-6">Vielen Dank für Ihren Auftrag!</p>

	<footer class="text-center text-sm text-gray-600 pt-4 border-t mb-10">
		<div>
			<p class="font-bold">Kontaktieren Sie uns!</p>
			<p class="text-gray-600">Gewerbestraße 11b | 5550 Radstadt | Telefon: +43 6601933616</p>
		</div>
	</footer>
</div>
