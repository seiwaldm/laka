<script>
	let invoiceNumber = 'INV-2024-001';
	let invoiceDate = new Date().toISOString().split('T')[0];
	let dueDate = '';

	let recipient = {
		name: 'Kundenname',
		address: 'Kundenadresse',
		city: 'Stadt, PLZ',
		phone: '',
		email: ''
	};

	let items = [{ description: 'Produkt/Dienstleistung', quantity: 1, price: 0.0 }];

	const addItem = () => {
		items.push({ description: '', quantity: 1, price: 0.0 });
	};

	const removeItem = (index) => {
		items.splice(index, 1);
	};

	const calculateTotal = () => {
		return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
	};
</script>

<div class="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
	<!-- Logo und Absender -->
	<div class="relative border-b pb-4">
		<!-- Absenderinformationen -->
		<div>
			<h1 class="text-2xl font-bold">Lack und Karosserie Radstadt</h1>
			<div class="flex space-x-2 text-sm">
				<p>Gewerbestraße 11b</p>
				<span>|</span>
				<p>5550 Schwemmberg</p>
				<span>|</span>
				<p>Tel: 06601933616</p>
				<span>|</span>
				<p>Email: info@laka.at</p>
			</div>
		</div>
		<!-- Logo -->
		<div class="absolute top-0 right-0">
			<img src="logo.png" alt="Logo" class="h-16 w-auto" />
		</div>
	</div>

	<!-- Rechnungsinformationen -->
	<div class="mt-10">
		<div class="grid grid-cols-2 m-4 gap-4">
			<!-- Empfänger -->
			<div>
				<h2 class="text-lg font-semibold">An</h2>
				<p>
					<input
						type="text"
						bind:value={recipient.name}
						placeholder="Kundenname"
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</p>
				<p>
					<input
						type="text"
						bind:value={recipient.address}
						placeholder="Kundenadresse"
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</p>
				<p>
					<input
						type="text"
						bind:value={recipient.city}
						placeholder="Stadt, PLZ"
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</p>
				<p>
					<input
						type="text"
						bind:value={recipient.phone}
						placeholder="Telefonnummer"
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</p>
				<p>
					<input
						type="email"
						bind:value={recipient.email}
						placeholder="E-Mail-Adresse"
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</p>
			</div>

			<!-- Rechnungsdetails -->
			<div>
				<div>
					<label for="invoiceNumber" class="block text-sm font-semibold">Rechnungsnummer</label>
					<input
						id="invoiceNumber"
						type="text"
						bind:value={invoiceNumber}
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</div>

				<div class="mt-4">
					<label for="invoiceDate" class="block text-sm font-semibold">Rechnungsdatum</label>
					<input
						id="invoiceDate"
						type="date"
						bind:value={invoiceDate}
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</div>

				<div class="mt-4">
					<label for="dueDate" class="block text-sm font-semibold">Fälligkeitsdatum</label>
					<input
						id="dueDate"
						type="date"
						bind:value={dueDate}
						class="w-full p-2 rounded outline-none focus:outline-none border-none"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Artikel/Dienstleistungen -->
	<div class="mt-8">
		<h2 class="text-lg font-semibold">Artikel/Dienstleistungen</h2>
		<table class="w-full mt-4 border-collapse border border-gray-200">
			<thead>
				<tr class="bg-gray-100">
					<th class="border p-2 text-left">Beschreibung</th>
					<th class="border p-2 text-right">Menge</th>
					<th class="border p-2 text-right">Preis (€)</th>
					<th class="border p-2 text-right">Betrag (€)</th>
					<th class="border p-2 text-center">Aktion</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item, index}
					<tr>
						<td class="border p-2">
							<input
								type="text"
								bind:value={item.description}
								placeholder="Beschreibung"
								class="w-full p-2 rounded"
							/>
						</td>
						<td class="border p-2 text-right">
							<input type="number" bind:value={item.quantity} min="1" class="w-full p-2 rounded" />
						</td>
						<td class="border p-2 text-right">
							<input
								type="number"
								bind:value={item.price}
								step="0.01"
								min="0"
								class="w-full p-2 rounded"
							/>
						</td>
						<td class="border p-2 text-right">{(item.quantity * item.price).toFixed(2)}</td>
						<td class="border p-2 text-center">
							<button on:click={() => removeItem(index)} class="text-red-500">Entfernen</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<button on:click={addItem} class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
			>+ Artikel hinzufügen</button
		>
	</div>

	<!-- Gesamtsumme -->
	<div class="mt-8 flex justify-end">
		<div class="text-right">
			<h2 class="text-lg font-semibold">Gesamtsumme: €{calculateTotal()}</h2>
		</div>
	</div>

	<!-- Absender unten -->
	<div class="flex justify-center gap-2 text-sm">
		<!-- <p>Lack und Karosserie Radstadt</p> -->

		<p>Gewerbestraße 11b</p>
		<span>|</span>
		<p>5550 Schwemmberg</p>
		<span>|</span>
		<p>Tel: 06601933616</p>
		<span>|</span>
		<p>Email: info@laka.at</p>
	</div>
</div>
