<script>
	// import logo from '../logo.png';
	let rechnummer = 'INV-2024-001';
	let rechdatum = new Date().toLocaleDateString('en-CA');
	let fälligdatum = '';

	let recipient = {
		name: 'Kundenname',
		address: 'Kundenadresse',
		city: 'Stadt, PLZ',
		phone: '',
		email: ''
	};

	let items = [{ description: 'Produkt/Dienstleistung', quantity: 1, price: 0.0 }];

	const calculateTotal = () => {
		return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
	};
</script>

<div class="a4 p-12 mx-auto">
	<!-- oberster Teil mit Verkäufer daten -->
	<div class="flex justify-between items-center border-b-2 border-gray-300 pb-6">
		<div>
			<h1 class="text-3xl font-bold text-gray-800">Lack und Karosserie Radstadt</h1>
			<p class="text-sm text-gray-600">Gewerbestraße 11b, 5550 Schwemmberg</p>
			<p class="text-sm text-gray-600">Tel: 06601933616 | Email: info@laka.at</p>
		</div>
		<img src="logo.png" alt="Logo" class="h-20 w-auto" />
	</div>

	<!-- Käufer daten -->
	<div class="grid grid-cols-2 gap-8 mt-8">
		<div>
			<div class="mt-10">
				<input
					type="text"
					bind:value={recipient.name}
					placeholder="Kundenname"
					class="w-full p-2"
				/>
				<input
					type="text"
					bind:value={recipient.address}
					placeholder="Kundenadresse"
					class="w-full p-2"
				/>
				<input
					type="text"
					bind:value={recipient.city}
					placeholder="Stadt, PLZ"
					class="w-full p-2"
				/>
				<!-- <input
					type="text"
					bind:value={recipient.phone}
					placeholder="Telefonnummer"
					class="w-full p-2"
				/>
				<input
					type="email"
					bind:value={recipient.email}
					placeholder="E-Mail-Adresse"
					class="w-full p-2"
				/> -->
			</div>
		</div>
		<div>
			<div class="space-y-2 mt-2">
				<div>
					<label for="invoiceNumber" class="block text-sm text-gray-600">Rechnungsnummer</label>
					<input id="invoiceNumber" type="text" bind:value={rechnummer} class="w-full p-2" />
				</div>
				<div>
					<label for="invoiceDate" class="block text-sm text-gray-600">Rechnungsdatum</label>
					<input id="invoiceDate" type="date" bind:value={rechdatum} class="w-full p-2" />
				</div>
				<div>
					<label for="dueDate" class="block text-sm text-gray-600">Fälligkeitsdatum</label>
					<input id="dueDate" type="date" bind:value={fälligdatum} class="w-full p-2" />
				</div>
			</div>
		</div>
	</div>

	<!-- Items Table -->
	<div class="mt-12">
		<h2 class="text-2xl font-semibold text-black mb-4">Rechnungsnummer</h2>

		<!-- rechnungsnummer einfügen -->

		<h2 class="text-lg font-semibold text-gray-700">Artikel / Dienstleistungen</h2>
		<table class="w-full mt-4 border border-gray-300">
			<thead class="bg-gray-100">
				<tr>
					<th class="border border-gray-300 p-2 text-left">Beschreibung</th>
					<th class="border border-gray-300 p-2 text-right">Menge</th>
					<th class="border border-gray-300 p-2 text-right">Preis (€)</th>
					<th class="border border-gray-300 p-2 text-right">Betrag (€)</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item, index}
					<tr>
						<td class="border border-gray-300 p-2">
							<input
								type="text"
								bind:value={item.description}
								placeholder="Beschreibung"
								class="w-full p-2"
							/>
						</td>
						<td class="border border-gray-300 p-2 text-right">
							<input
								type="number"
								bind:value={item.quantity}
								min="1"
								class="w-full p-2 text-right"
							/>
						</td>
						<td class="border border-gray-300 p-2 text-right">
							<input
								type="number"
								bind:value={item.price}
								step="0.01"
								min="0"
								class="w-full p-2 text-right"
							/>
						</td>
						<td class="border border-gray-300 p-2 text-right"
							>{(item.quantity * item.price).toFixed(2)}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Total Amount -->
	<div class="mt-8 text-right">
		<h2 class="text-2xl font-semibold text-gray-700">Gesamtsumme: €{calculateTotal()}</h2>
	</div>

	<!-- Footer -->
	<div class=" text-center text-sm text-gray-600 border-t">
		<p>Lack und Karosserie Radstadt</p>
		<p>Gewerbestraße 11b, 5550 Schwemmberg | Tel: 06601933616 | Email: info@laka.at</p>
	</div>
</div>

<style>
	.a4 {
		width: 210mm;
		height: 297mm;
		padding: 20mm;
		background-color: #ffffff;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
