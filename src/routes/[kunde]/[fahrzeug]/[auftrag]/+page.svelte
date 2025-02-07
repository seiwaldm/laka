<script>
	import { pb } from '$lib/pocketbase.js';
	import { page } from '$app/stores';

	import { icons } from '$lib/icons';
	import { openCloudinaryWidget } from '$lib/cloudinary.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	// laden der Daten
	export let data;

	let showSuccessMessage = false;

	// Funktion zum öffnen des Cloudinary Widgets, so dass sie in icons verwendet werden kann

	// Zustand für die Sichbarkeit der Card definieren
	let showCard = false;

	// Zustand für die Sichtbarkeit des Bearbeitungsformulars definieren
	let showEditForm = false;

	// Zustand für die Sichtbarkeit der Rechnung definieren
	let showAuftrag = false;

	// Zustand für die Sichtbarkeit des Bestätigungsdialogs definieren
	let showDeleteConfirm = false;

	// Zustand für die Sichtbarkeit des Bestätigungsdialogs für Ersatzteile definieren
	let showDeleteConfirmErsatzteil = false;

	// Zustand für die Sichtbarkeit des Bestätigungsdialogs für Arbeitszeit definieren
	let showDeleteConfirmArbeitszeit = false;

	// Zustand für die Sichtbarkeit des Formulars "Ersatzteile hinzufügen"
	let showAddPartForm = false;

	// Zustand für die Sichtbarkeit des Formulars "Arbeitsstunden hinzufügen"
	let showAddHourForm = false;

	// Setze das aktuelle Ersatzteil das gelöscht werden soll
	function confirmDeleteErsatzteil(ErsatzteilId) {
		showDeleteConfirmErsatzteil = ErsatzteilId;
	}

	// Setze die aktuelle Arbeitszeit die gelöscht werden soll
	function confirmDeleteArbeitszeit(ArbeitszeitId) {
		showDeleteConfirmArbeitszeit = ArbeitszeitId;
	}

	function deleteErsatzteileConfirmed() {
		if (showDeleteConfirmErsatzteil !== null) {
			deleteErsatzteile(showDeleteConfirmErsatzteil); // Führt die Löschfunktion aus
			showDeleteConfirmErsatzteil = null; // Schließt das Dialog nach dem Löschen
		}
	}

	function deleteArbeitszeitConfirmed() {
		if (showDeleteConfirmArbeitszeit !== null) {
			deleteArbeitszeit(showDeleteConfirmArbeitszeit); // Führt die Löschfunktion aus
			showDeleteConfirmArbeitszeit = null; // Schließt das Dialog nach dem Löschen
		}
	}

	// Variablen für die update Funktion
	let updateAuftragid = $page.params.auftrag;
	let updateArbeiten = '';
	let updateBildSchaden = '';
	let updateBildFertig = '';
	let updateRechnung = '';
	let updateFahrzeugid = $page.params.fahrzeug;
	let updateAuftragnr = '';
	let updateInfotext = '';
	let updateLieferschein = '';

	// funktion zum aktualisieren des Auftrags
	async function updateAuftrag() {
		const auftragDaten = {
			action: 'updateAuftrag',
			updateAuftragid,
			updateArbeiten,
			updateBildSchaden,
			updateBildFertig,
			updateRechnung,
			updateAuftragnr,
			updateFahrzeugid,
			updateLieferschein,
			ausgewählteZahlungsart
		};
		try {
			const response = await fetch('/update-client', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(auftragDaten)
			});
			const result = await response.json();
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(auftragDaten);
	}

	// Funktion zum zurücksetzen des Updateformulars
	function resetupdateAuftrag() {
		updateArbeiten = '';
		updateBildSchaden = '';
		updateBildFertig = '';
		updateRechnung = '';
		updateAuftragnr = '';
		updateInfotext = '';
		updateLieferschein = '';
		showEditForm = false;
	}

	let auftragsdokument = false;
	let zahlungsart = [
		{ id: 1, Zahlungsart: 'Barverkauf' },
		{ id: 2, Zahlungsart: 'Überweisung' }
	];
	let ausgewählteZahlungsart = '';

	// Funktion zum erstellen einer Rechnung (Datensatz)
	async function createRechnung() {
		const rechnungsDaten = {
			action: 'createRechnung',
			auftrag: $page.params.auftrag,
			ersatzteile: data.ersatzteile.items,
			arbeitszeit: data.arbeitszeit.items,
			auftragsdokument
		};
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(rechnungsDaten)
			});
			// showRechnungLink = true;
			const result = await response.json();
			window.location.href = result.data.url;
		} catch (error) {
			console.error(error);
		}
		console.log(rechnungsDaten);
	}

	// Variablen für die Felder des Formulars Ersatzteile
	let ersatzteilArtikelnummer = '';
	let ersatzteilBezeichnung = '';
	let ersatzteilMenge = '';
	let ersatzteilRabatt = '';
	let ersatzteilVKPreisNetto = '';
	let ersatzteilEKPreis = '';
	let ersatzteilVKPreisBrutto = '';
	let auftragid = $page.params.auftrag;
	let isSubmittedErsatzteil = false;

	//überprüfen ob die Felder leer sind
	const validateField = (field) => (field.trim && field.trim() === '') || field <= 0;

	// Ersatzteil speichern
	const handleSubmitErsatzteil = async (event) => {
		event.preventDefault();
		isSubmittedErsatzteil = true;

		if (
			!validateField(ersatzteilBezeichnung) &&
			!validateField(ersatzteilMenge) &&
			!validateField(ersatzteilVKPreisNetto)
		) {
			await createErsatzteil();
		}
	};

	// Funktion zum Erstellen eines Ersatzteils
	async function createErsatzteil() {
		showSuccessMessage = true;
		const ersatzteilDaten = {
			action: 'createErsatzteil',
			ersatzteilArtikelnummer,
			ersatzteilBezeichnung,
			ersatzteilMenge,
			ersatzteilRabatt,
			ersatzteilVKPreisNetto: parseFloat(ersatzteilVKPreisNetto),
			ersatzteilEKPreis: parseFloat(ersatzteilEKPreis),
			ersatzteilVKPreisBrutto: parseFloat(ersatzteilVKPreisBrutto),
			auftragid
		};
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(ersatzteilDaten)
			});
			location.reload();
		} catch (error) {
			console.error(error);
		}
		console.log(ersatzteilDaten);
	}

	// Funktion zum Zurücksetzen des Formulars Ersatzteile und ausblenden
	function resetErsatzteil() {
		ersatzteilArtikelnummer = '';
		ersatzteilBezeichnung = '';
		ersatzteilMenge = '';
		ersatzteilRabatt = '';
		ersatzteilVKPreisNetto = '';
		ersatzteilEKPreis = '';
		ersatzteilVKPreisBrutto = '';
		showAddPartForm = false;
		isSubmittedErsatzteil = false;
	}

	// Variablen für die Felder des Formulars Arbeitsstunden
	let stundenArbeit = '';
	let stundenKuerzel = '';
	let stundenInfotext = '';
	let stundenMenge = '';
	let stundenRabatt = '';
	let stundenFestpreis = 0;
	let stundenNettosumme = '';
	let stundenBruttosumme = '';
	let isSubmittedArbeitszeit = false;

	// Arbeitszeit speichern
	const handleSubmitArbeitszeit = async (event) => {
		event.preventDefault();
		isSubmittedArbeitszeit = true;

		if (!validateField(stundenArbeit) && !validateField(stundenMenge)) {
			await createArbeitszeit();
			// API-Aufruf oder weitere Logik hier einfügen
		}
	};

	// Funktion zum Hinzufügen eines Arbeitszeit
	async function createArbeitszeit() {
		showSuccessMessage = true;
		// Berechnung des Gesamtpreises
		const arbeitszeitDaten = {
			action: 'createArbeitszeit',
			stundenArbeit,
			stundenKuerzel,
			stundenInfotext,
			stundenMenge,
			stundenRabatt,
			stundenFestpreis: parseFloat(stundenFestpreis),
			stundenNettosumme: parseFloat(stundenNettosumme),
			stundenBruttosumme: parseFloat(stundenBruttosumme),
			auftragid
		};
		console.log(arbeitszeitDaten);
		try {
			const response = await fetch('/create-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(arbeitszeitDaten)
			});
			if (response.ok) {
				location.reload();
			} else {
				const error = await response.text();
				alert(`Fehler: ${error}`);
			}
		} catch (error) {
			console.error('Fehler beim Hinzufügen der Arbeitszeit:', error);
			alert('Ein unerwarteter Fehler ist aufgetreten.');
		}
	}

	async function deleteArbeitszeit(ArbeitszeitId) {
		await pb.collection('Arbeitszeit').delete(ArbeitszeitId);
		location.reload();
	}

	async function deleteErsatzteile(ErsatzteilId) {
		await pb.collection('Ersatzteile').delete(ErsatzteilId);
		location.reload();
	}

	// Funktion zum Aktualisieren des Festpreises basierend auf der Auswahl der arbeitswerte
	async function updateArbeitswerte(event) {
		const arbeitswerteID = event.target.value;

		// Sicherstellen, dass arbeitswerte vorhanden sind
		if (!data.arbeitswerte || data.arbeitswerte.length === 0) {
			console.error('Keine Arbeitswerte vorhanden');
			return;
		}
		const arbeit = data.arbeitswerte.find((item) => item.id === arbeitswerteID);
		if (arbeit) {
			stundenFestpreis = arbeit.AwPreis;
			stundenKuerzel = arbeit.Kuerzel;
		} else {
			stundenFestpreis = 0;
			stundenKuerzel = '';
		}
	}

	function resetArbeitszeit() {
		stundenArbeit = '';
		stundenKuerzel = '';
		stundenInfotext = '';
		stundenMenge = '';
		stundenRabatt = '';
		stundenFestpreis = 0;
		showAddHourForm = false;
		isSubmittedArbeitszeit = false;
	}

	let datenfeld = [
		'Auftragnummer',
		'Arbeiten',
		'Infotext',
		'BildSchaden',
		'BildFertig',
		'Lieferschein',
		'Rechnung'
	];

	const Auftragdaten = {
		Arbeiten: 'Arbeiten',
		Auftragnummer: 'Auftragnummer',
		BildSchaden: 'Schaden',
		BildFertig: 'Fertig',
		Infotext: 'Infotext',
		Lieferschein: 'Lieferschein',
		Rechnung: 'Rechnung'
	};

	// Funktion zum Schließen des Bestätigungsdialogs
	function cancelDelete() {
		showDeleteConfirm = false;
		showDeleteConfirmErsatzteil = false;
		showDeleteConfirmArbeitszeit = false;
		showDeleteConfirmBild = false;
	}

	// Funktion zum Löschen eines Auftrages mit den dazugehörigen Ersatzteilen und Abreitiszeiten mit Bestätigung

	async function deleteAuftrag() {
		try {
			for (const ersatzteile of data.ersatzteile.items) {
				console.log(ersatzteile.AuftragID);
				if (ersatzteile.AuftragID === $page.params.auftrag) {
					await pb.collection('Ersatzteile').delete(ersatzteile.id);
					console.log(ersatzteile.id);
				}
			}
			for (const arbeitszeiten of data.arbeitszeit.items) {
				if (arbeitszeiten.AuftragID === $page.params.auftrag) {
					await pb.collection('Arbeitszeit').delete(arbeitszeiten.id);
				}
			}
			await pb.collection('Auftrag').delete($page.params.auftrag);
		} catch (error) {
			// location.reload();
			console.error(error);
		}
	}

	async function deleteBild(id, publicId) {
		try {
			console.log(id, publicId);
			if (!publicId) {
				throw new Error('publicId fehlt!');
			}
			// Cloudinary-Bild löschen
			const cloudinaryResponse = await fetch('/delete-bild', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ publicId })
			});
			if (!cloudinaryResponse.ok) {
				throw new Error('Fehler beim Löschen des Bildes auf Cloudinary');
			}
			// Bild aus der Datenbank löschen
			await pb.collection('Datei').delete(id);
			location.reload();
		} catch (error) {
			console.error(error);
		}
	}

	async function uploadFile() {
		const fileInput = document.getElementById('fileInput');
		const file = fileInput.files[0];
		if (file) {
			const formData = new FormData();
			formData.append('Dateien', file);
			const record = await pb.collection('Auftrag').update($page.params.auftrag, formData);
			console.log(record);
		}
	}

	onMount(() => {
		ausgewählteZahlungsart = data.auftrag.Zahlungsart;
	});
</script>

<!-- Dateien auf cloudinary hochladen -->
<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/latest/global/all.js"
		type="text/javascript"
	></script>
</svelte:head>

<!-- links zu den verschiedenen Seiten -->
<h1 class="text-base pl-5 flex items-center my-5">
	<!-- Mobile und Tablet Design -->
	<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block lg:hidden"></iconify-icon>
	<a href="/{$page.params.kunde}/{$page.params.fahrzeug}" class="hover:underline block lg:hidden">
		Zurück
	</a>

	<!-- Desktop Design ) -->
	<div class="hidden lg:flex items-center">
		<iconify-icon icon="lucide:arrow-left" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/" class="hover:underline">Startseite </a>

		<iconify-icon icon="lucide:chevron-right" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/{$page.params.kunde}" class="hover:underline">Kunde {data.Nachname}</a>

		<iconify-icon icon="lucide:chevron-right" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		<a href="/{$page.params.kunde}/{$page.params.fahrzeug}" class="hover:underline">
			Fahrzeug {data.fahrzeuge.Marke}
		</a>

		<iconify-icon icon="lucide:chevron-right" class="mx-3 text-xl mt-0.5 block"></iconify-icon>
		Auftrag {data.auftrag.Arbeiten}
	</div>
</h1>

<!-- Icon mit 3 Punkten für das Dropdown-Menü -->
<div class="absolute top-32 lg:top-10 right-10">
	<DropdownMenu.Root>
		<!-- Füge relative Positionierung hinzu -->
		<DropdownMenu.Trigger>
			<button class=" text-gray-600 hover:text-gray-800 text-2xl" aria-label="Options"> ⋮ </button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group class="mt-2 w-48  bg-white shadow-md rounded-md p-2">
				<!--  Bestätigungsdialog -->
				<DropdownMenu.Label class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2">
					<button on:click={() => (showDeleteConfirm = true)}>Löschen</button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Label class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2">
					<button
						on:click={() => {
							showEditForm = true;
							showDeleteConfirm = false; // Dropdown schließt sich
						}}
					>
						Bearbeiten
					</button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- Rechnung -->
				<DropdownMenu.Label
					class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2 hidden md:block"
				>
					<button on:click={createRechnung}> Rechnung </button>
				</DropdownMenu.Label>
				<DropdownMenu.Separator class="hidden md:block" />
				<DropdownMenu.Label
					class="text-black text-base hover:bg-slate-600 rounded-lg px-4 py-2 hidden md:block"
				>
					<button
						on:click={() => {
							auftragsdokument = true;
							createRechnung();
						}}>Auftrag</button
					>
				</DropdownMenu.Label>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<!-- Bestätigungsdialog für Löschen -->
{#if showDeleteConfirm}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-lg font-bold">Sind Sie sicher?</h2>
			<p>Möchten Sie diesen Auftrag wirklich löschen?</p>
			<div class="mt-4 flex justify-end gap-4">
				<button
					class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
					on:click={cancelDelete}
				>
					Abbrechen
				</button>
				<a href="/{$page.params.kunde}/{$page.params.fahrzeug}"
					><button
						class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
						on:click={deleteAuftrag}
					>
						Löschen
					</button>
				</a>
			</div>
		</div>
	</div>
{/if}
{#if showDeleteConfirmErsatzteil}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-lg font-bold">Sind Sie sicher?</h2>
			<p>Möchten Sie das Ersatzteil wirklich löschen?</p>
			<div class="mt-4 flex justify-end gap-4">
				<button
					class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
					on:click={cancelDelete}
				>
					Abbrechen
				</button>
				<button
					class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
					on:click={deleteErsatzteileConfirmed}
				>
					Löschen
				</button>
			</div>
		</div>
	</div>
{/if}
{#if showDeleteConfirmArbeitszeit}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-lg font-bold">Sind Sie sicher?</h2>
			<p>Möchten Sie diese Arbeitszeit wirklich löschen?</p>
			<div class="mt-4 flex justify-end gap-4">
				<button
					class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
					on:click={cancelDelete}
				>
					Abbrechen
				</button>
				<button
					class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
					on:click={deleteArbeitszeitConfirmed}
				>
					Löschen
				</button>
			</div>
		</div>
	</div>
{/if}
<!-- {#if showDeleteConfirmBild}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-md">
			<h2 class="text-lg font-bold">Sind Sie sicher?</h2>
			<p>Möchten Sie das Bild wirklich löschen?</p>
			<div class="mt-4 flex justify-end gap-4">
				<button
					class="text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
					on:click={cancelDelete}
				>
					Abbrechen
				</button>
				<button
					class="text-white bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
					on:click={deleteBild}
				>
					Löschen
				</button>
			</div>
		</div>
	</div>
{/if} -->
<div class="my-5"><hr /></div>

<!-- Button zum öffnen des Cloudinary Widgets -->
<button on:click={openCloudinaryWidget($page.params.auftrag, 'schaden')}
	><iconify-icon icon="lucide:camera"></iconify-icon></button
>

<!-- Auftraginformationen  -->
<div class="pl-5">
	<h1 class=" my-5 text-2xl font-bold">Auftraginformationen</h1>
	{#each Object.entries(data.auftrag)
		.filter((item) => datenfeld.includes(item[0]))
		.sort((a, b) => datenfeld.indexOf(a[0]) - datenfeld.indexOf(b[0])) as [key, value]}
		<div class="mb-4 flex items-center relative ml-6">
			<button class="mr-2" on:click={() => icons[key]?.action && icons[key].action()}>
				<iconify-icon
					icon={typeof icons[key] === 'object' ? icons[key].icon : icons[key]}
					class="mr-2 text-2xl translate-y-1"
				></iconify-icon></button
			>
			<span class="font-bold">{Auftragdaten[key]}:</span>
			<span class="absolute left-48">{value}</span>
		</div>
	{/each}

	<!-- Unterüberschrift 1 -->
	<h2 class="text-lg font-bold mb-4">Ersatzteile</h2>
	<button
		class=" bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 mb-2 py-1"
		on:click={() => (showAddPartForm = !showAddPartForm)}
	>
		+ Hinzufügen
	</button>
	{#if data.ersatzteile.items.length > 0}
		{#each data.ersatzteile.items as Ersatzteile (Ersatzteile.id)}
			<span class="flex items-center ml-4 gap-2 leading-tight">
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{Ersatzteile.Bezeichnung}
				{Ersatzteile.Menge} Stk. € {Ersatzteile.Bruttosumme}

				<button
					type="button"
					class="absolute right-0 pr-10 text-black rounded-lg"
					on:click|stopPropagation|preventDefault={() => confirmDeleteErsatzteil(Ersatzteile.id)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') confirmDeleteErsatzteil(Ersatzteile.id);
					}}
				>
					<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
				</button>
			</span>
		{/each}
	{/if}

	<!-- Unterüberschrift 2 -->
	<h2 class="text-lg font-bold mt-6 mb-4">Arbeitsstunden</h2>
	<button
		class=" bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 mb-2 py-1"
		on:click={() => (showAddHourForm = !showAddHourForm)}
	>
		+ Hinzufügen
	</button>
	{#if data.arbeitszeit.items.length > 0}
		{#each data.arbeitszeit.items as Arbeitszeit (Arbeitszeit.id)}
			<span class="flex items-center ml-4 gap-2 leading-tight">
				<iconify-icon icon="lucide-car" class="text-4xl"></iconify-icon>
				{Arbeitszeit.expand.ArbeitswerteID.Leistungsbezeichnung}
				{Arbeitszeit.Menge} Std. € {Arbeitszeit.Bruttosumme}

				<button
					type="button"
					class="absolute right-0 pr-10 text-black rounded-lg"
					on:click|stopPropagation|preventDefault={() => confirmDeleteArbeitszeit(Arbeitszeit.id)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') confirmDeleteArbeitszeit(Arbeitszeit.id);
					}}
				>
					<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
				</button>
			</span>
		{/each}
	{/if}

	<h2 class="text-lg font-bold mt-6 mb-4">Bild Schaden</h2>
	<button
		class=" bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 mb-2 py-1"
		on:click={openCloudinaryWidget($page.params.auftrag, 'schaden')}
	>
		+ Hinzufügen
	</button>
	{#if data.datei.items.length > 0}
		{#each data.datei.items as Datei (Datei.id)}
			{#if Datei.URL}
				{#if Datei.Fototyp === 'schaden'}
					<span class="flex items-center ml-4 gap-2 leading-tight">
						<a href={Datei.URL} target="_blank" rel="noopener noreferrer">
							<img
								src={Datei.URL}
								alt="Bild Schaden"
								class="w-20 h-20 object-cover rounded-lg shadow-md"
							/>
						</a>
						<!-- Lösch-Button -->
						<button
							type="button"
							class="absolute right-0 pr-10 text-black rounded-lg"
							on:click={() => deleteBild(Datei.id, Datei.Public_id)}
						>
							<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
						</button>
					</span>
				{/if}
			{/if}
		{/each}
	{/if}

	<h2 class="text-lg font-bold mt-6 mb-4">Bild Fertig</h2>
	<button
		class=" bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 mb-2 py-1"
		on:click={openCloudinaryWidget($page.params.auftrag, 'fertig')}
	>
		+ Hinzufügen
	</button>
	{#if data.datei.items.length > 0}
		{#each data.datei.items as Datei (Datei.id)}
			{#if Datei.URL}
				{#if Datei.Fototyp === 'fertig'}
					<span class="flex items-center ml-4 gap-2 leading-tight"
						><a href={Datei.URL} target="_blank" rel="noopener noreferrer">
							<img
								src={Datei.URL}
								alt="Bild Fertig"
								class="w-20 h-20 object-cover rounded-lg shadow-md"
							/>
						</a>
						<button
							type="button"
							class="absolute right-0 pr-10 text-black rounded-lg"
							on:click={() => deleteBild(Datei.id, Datei.Public_id)}
						>
							<iconify-icon icon="lucide:trash-2" role="img"></iconify-icon>
						</button>
					</span>
				{/if}
			{/if}
		{/each}
	{/if}

	<form on:submit={uploadFile} class="flex flex-col">
		<label class="text-lg font-bold mt-6 mb-4" for="fileInput">Dateiupload</label>
		<input type="file" name="fileInput" id="fileInput" />
		<button class=" bg-slate-600 text-white hover:bg-slate-900 rounded-lg px-3 mb-2 py-1"
			>Upload</button
		>
	</form>
</div>

<!-- Formular zum Hinzufügen der Ersatzteile -->
{#if showSuccessMessage}
	<div
		class="fixed bottom-4 left-4 p-3 text-sm text-green-700 bg-green-100 border border-green-200 rounded-lg shadow-lg z-50 max-w-xs"
	>
		Erfolgreich gespeichert!
	</div>
{/if}

{#if showAddPartForm}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-2xl shadow-lg max-w-3xl w-full mx-4">
			<h3 class="text-xl font-bold text-gray-700 mb-4">Ersatzteil hinzufügen</h3>
			<form on:submit={handleSubmitErsatzteil}>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label
							for="ersatzteilArtikelnummer"
							class="block text-sm font-medium text-gray-600 mb-1">Artikelnummer</label
						>
						<input
							id="ersatzteilArtikelnummer"
							type="text"
							bind:value={ersatzteilArtikelnummer}
							placeholder="Artikelnummer"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div>
						<label for="ersatzteilName" class="block text-sm font-medium text-gray-600 mb-1"
							>Bezeichnung</label
						>
						<input
							id="ersatzteilName"
							type="text"
							bind:value={ersatzteilBezeichnung}
							placeholder="Ersatzteil Name"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 {isSubmittedErsatzteil &&
							validateField(ersatzteilBezeichnung)
								? 'border-red-500'
								: ''}"
						/>
						{#if isSubmittedErsatzteil && validateField(ersatzteilBezeichnung)}
							<span class="text-sm text-red-500">Bezeichnung ist erforderlich.</span>
						{/if}
					</div>
					<div>
						<label for="ersatzteilStück" class="block text-sm font-medium mb-1">Menge</label>
						<input
							id="ersatzteilStück"
							type="number"
							bind:value={ersatzteilMenge}
							placeholder="Stück"
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 {isSubmittedErsatzteil &&
							validateField(ersatzteilMenge)
								? 'border-red-500'
								: ''}"
						/>
						{#if isSubmittedErsatzteil && validateField(ersatzteilMenge)}
							<span class="text-sm text-red-500">Menge muss größer als 0 sein.</span>
						{/if}
					</div>
					<div>
						<label for="gesamtpreis" class="block text-sm font-medium mb-1">Marge in %</label>
						<input
							id="marge"
							type="number"
							value={ersatzteilVKPreisNetto > 0
								? (
										((ersatzteilVKPreisNetto - ersatzteilEKPreis) / ersatzteilVKPreisNetto) *
										100
									).toFixed(2)
								: 0}
							placeholder="Gesamtpreis (wird berechnet)"
							class="w-full px-3 py-2 border rounded-lg bg-gray-100"
							disabled
						/>
					</div>
					<div>
						<label for="einzelpreis" class="block text-sm font-medium mb-1">Rabatt in %</label>
						<input
							id="rabatt"
							type="number"
							bind:value={ersatzteilRabatt}
							placeholder=""
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div>
						<label for="einzelpreis" class="block text-sm font-medium mb-1"
							>Verkaufspreis Netto</label
						>
						<input
							id="einzelpreis"
							type="number"
							bind:value={ersatzteilVKPreisNetto}
							placeholder="Einzelpreis"
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 {isSubmittedErsatzteil &&
							validateField(ersatzteilVKPreisNetto)
								? 'border-red-500'
								: ''}"
						/>
						{#if isSubmittedErsatzteil && validateField(ersatzteilVKPreisNetto)}
							<span class="text-sm text-red-500">Verkaufspreis Netto ist erforderlich.</span>
						{/if}
					</div>
					<div>
						<label for="einzelpreis" class="block text-sm font-medium mb-1"
							>Einkaufspreis Netto</label
						>
						<input
							id="einzelpreis"
							type="number"
							bind:value={ersatzteilEKPreis}
							placeholder="Einzelpreis"
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div>
						<label for="einzelpreis" class="block text-sm font-medium mb-1"
							>Verkaufspreis Brutto</label
						>
						<input
							id="einzelpreis"
							type="number"
							value={parseFloat(ersatzteilVKPreisNetto * 1.2).toFixed(2)}
							placeholder="Einzelpreis"
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div>
						<label for="gesamtpreis" class="block text-sm font-medium mb-1">Nettosumme</label>
						<input
							id="gesamtpreis"
							type="number"
							value={parseFloat(
								((ersatzteilVKPreisNetto * (100 - ersatzteilRabatt)) / 100) * ersatzteilMenge
							).toFixed(2)}
							placeholder="Gesamtpreis (wird berechnet)"
							class="w-full px-3 py-2 border rounded-lg bg-gray-100"
							disabled
						/>
					</div>
					<div>
						<label for="gesamtpreis" class="block text-sm font-medium mb-1">Bruttosumme</label>
						<input
							id="gesamtpreis"
							type="number"
							value={parseFloat(
								((ersatzteilVKPreisNetto * (100 - ersatzteilRabatt)) / 100) * ersatzteilMenge * 1.2
							).toFixed(2)}
							placeholder="Gesamtpreis (wird berechnet)"
							class="w-full px-3 py-2 border rounded-lg bg-gray-100"
							disabled
						/>
					</div>
				</div>
				<div class="mt-4 flex justify-end gap-2">
					<button
						type="reset"
						class="bg-gray-300 text-black hover:bg-gray-400 rounded-lg px-4 py-2"
						on:click={resetErsatzteil}
					>
						Abbrechen
					</button>
					<button
						class="bg-blue-600 text-white hover:bg-blue-800 rounded-lg px-5 py-2"
						on:click={handleSubmitErsatzteil}
					>
						Hinzufügen
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Formular zum Hinzufügen von Arbeitsstunden -->
{#if showSuccessMessage}
	<div
		class="fixed bottom-4 left-4 p-3 text-sm text-green-700 bg-green-100 border border-green-200 rounded-lg shadow-lg z-50 max-w-xs"
	>
		Erfolgreich gespeichert!
	</div>
{/if}

{#if showAddHourForm}
	<div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4">
		<div class="bg-white p-6 rounded-2xl shadow-lg max-w-3xl w-full mx-auto">
			<h3 class="text-xl font-bold text-gray-700 mb-4 text-center">Arbeitsstunden hinzufügen</h3>
			<form on:submit={handleSubmitArbeitszeit}>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label for="arbeitName" class="block text-sm font-medium text-gray-600 mb-1"
							>Arbeit</label
						>
						<select
							id="arbeitName"
							bind:value={stundenArbeit}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 {isSubmittedArbeitszeit &&
							validateField(stundenArbeit)
								? 'border-red-500'
								: ''}"
							on:change={updateArbeitswerte}
						>
							<option value="" disabled selected>Bitte wählen</option>
							{#each data.arbeitswerte as arbeit}
								<option value={arbeit.id}>{arbeit.Leistungsbezeichnung}</option>
							{/each}
						</select>
						{#if isSubmittedArbeitszeit && validateField(stundenArbeit)}
							<span class="text-sm text-red-500">Bitte wählen Sie eine Arbeit aus.</span>
						{/if}
					</div>
					<div>
						<label for="kuerzel" class="block text-sm font-medium text-gray-600 mb-1">Kürzel</label>
						<input
							id="kuerzel"
							type="text"
							bind:value={stundenKuerzel}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
							readonly
						/>
					</div>
					<div>
						<label for="stundenMenge" class="block text-sm font-medium text-gray-600 mb-1"
							>Stunden</label
						>
						<input
							id="stundenMenge"
							type="number"
							bind:value={stundenMenge}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 {isSubmittedArbeitszeit &&
							validateField(stundenMenge)
								? 'border-red-500'
								: ''}"
						/>
						{#if isSubmittedArbeitszeit && validateField(stundenMenge)}
							<span class="text-sm text-red-500">Bitte geben Sie die Stunden an.</span>
						{/if}
					</div>
					<div>
						<label for="geleisteteArbeit" class="block text-sm font-medium text-gray-600 mb-1"
							>Infotext</label
						>
						<input
							id="geleisteteArbeit"
							type="text"
							bind:value={stundenInfotext}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div>
						<label for="rabatt" class="block text-sm font-medium text-gray-600 mb-1">Rabatt</label>
						<input
							id="rabatt"
							type="number"
							bind:value={stundenRabatt}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						/>
					</div>
					<div>
						<label for="festpreis" class="block text-sm font-medium text-gray-600 mb-1"
							>Festpreis</label
						>
						<input
							id="festpreis"
							type="number"
							bind:value={stundenFestpreis}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
							readonly
						/>
					</div>
					<div>
						<label
							for="stundenGesamtpreisNetto"
							class="block text-sm font-medium text-gray-600 mb-1">Nettosumme</label
						>
						<input
							id="stundenGesamtpreisNetto"
							type="text"
							value={parseFloat(
								((stundenFestpreis * (100 - stundenRabatt)) / 100) * stundenMenge
							).toFixed(2)}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
							disabled
						/>
					</div>
					<div>
						<label
							for="stundenGesamtpreisBrutto"
							class="block text-sm font-medium text-gray-600 mb-1">Bruttosumme</label
						>
						<input
							id="stundenGesamtpreisBrutto"
							type="text"
							value={parseFloat(
								((stundenFestpreis * (100 - stundenRabatt)) / 100) * stundenMenge * 1.2
							).toFixed(2)}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
							disabled
						/>
					</div>
				</div>
				<div class="mt-6 flex justify-end gap-4">
					<button
						class="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg px-5 py-2"
						on:click={resetArbeitszeit}
					>
						Abbrechen
					</button>
					<button
						class="bg-blue-600 text-white hover:bg-blue-800 rounded-lg px-5 py-2"
						on:click={handleSubmitArbeitszeit}
					>
						Hinzufügen
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Option zur Auswahl von Barverkauf oder Überweisung -->
<div class="p-4">
	<h2 class="text-lg font-bold mb-4">Zahlungsart</h2>
	<div class="flex items-center gap-4">
		{#each zahlungsart as zahlungsart}
			<label class="flex items-center gap-2">
				<input
					type="radio"
					bind:group={ausgewählteZahlungsart}
					value={zahlungsart.Zahlungsart}
					on:change={updateAuftrag}
					class="form-radio text-slate-600 focus:ring focus:ring-blue-300"
				/>
				<span>{zahlungsart.Zahlungsart}</span>
			</label>
		{/each}
	</div>
	<!-- Anzeige der ausgewählten Zahlungsart -->
	<p class="mt-4 text-sm text-gray-600">
		Gewählte Zahlungsart: <span class="font-semibold">{ausgewählteZahlungsart}</span>
	</p>
</div>
<hr />
<!-- Auftragbearbeitungsfeld -->
<div>
	{#if showEditForm}
		<!-- Overlay -->
		<button
			class="fixed inset-0 bg-gray-700 bg-opacity-50 z-40"
			on:click={() => (showEditForm = false)}
			on:keydown={(e) => e.key === 'Enter' && (showEditForm = false)}
			tabindex="0"
		></button>

		<div class="fixed inset-0 flex items-center justify-center z-50">
			<Card.Root
				class="lg:w-[700px] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden flex flex-col"
			>
				<Card.Header class="p-4 border-b">
					<Card.Title class="text-lg font-bold">Auftragsdaten bearbeiten</Card.Title>
				</Card.Header>
				<Card.Content class="flex-1 overflow-y-auto p-4">
					<form>
						<div class="grid gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="auftragnr">Auftragnummer</Label>
								<Input
									type="auftragnr"
									bind:value={updateAuftragnr}
									placeholder={data.auftrag.Auftragnummer}
									class="max-w-xs"
								/>
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="arbeiten">Arbeiten</Label>
								<Input
									type="arbeiten"
									bind:value={updateArbeiten}
									placeholder={data.auftrag.Arbeiten}
									class="max-w-xs"
								/>
								<!-- <div class="flex flex-col space-y-1.5">
							<Label for="bildSchaden">Bild vom Schaden</Label>
							<Input id="bildSchaden" bind:value={bildSchaden} type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="bildFertig">Bild vom reparierten Schaden</Label>
							<Input id="bildFertig" bind:value={bildFertig} type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="lieferschein">Lieferschein</Label>
							<Input id="lieferschien" bind:value={lieferschein} type="file" class="max-w-xs" />
						</div>
						<div class="flex flex-col space-y-1.5">
							<Label for="rechnung">Rechnung</Label>
							<Input
								type="rechnung"
								bind:value={rechnung}
								placeholder="Rechnung erstellen"
								class="max-w-xs"
							/>
						</div> -->
								<div class="flex flex-col space-y-1.5">
									<Label for="arbeiten">Infotext</Label>
									<Input
										type="arbeiten"
										bind:value={updateInfotext}
										placeholder={data.auftrag.Infotext}
										class="max-w-xs"
									/>
								</div>
							</div>
						</div>
					</form>
				</Card.Content>

				<Card.Footer class="p-4 border-t flex justify-between">
					<button
						class="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
						on:click={resetupdateAuftrag}
					>
						Abbrechen
					</button>
					<button
						class="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
						on:click={updateAuftrag}
					>
						Speichern
					</button>
				</Card.Footer>
			</Card.Root>
		</div>
	{/if}
</div>
