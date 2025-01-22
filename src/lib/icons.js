import { openCloudinaryWidgetSchaden } from './cloudinary';
import { openCloudinaryWidgetFertig } from './cloudinary';
import { openCloudinaryWidgetRechnung } from './cloudinary';
import { openCloudinaryWidgetAuftrag } from './cloudinary';
import { openCloudinaryWidgetLieferschein } from './cloudinary';
// wir definieren für jedes anzuzeigende Datenfeld aus Pocketbase ein Icon mit dem String "lucide-<Iconname>"
export const icons = {
	Vorname: 'lucide-user',
	EMail: 'lucide-mail',
	Nachname: 'lucide-user',
	Telefonnr: 'lucide-phone',
	Strasse: 'lucide-map-pin-house',
	Ort: 'lucide-house',
	Kennzeichen: 'lucide-check-circle',
	Marke: 'lucide-car-front',
	Modell: 'lucide-car-front',
	Erstzulassung: 'lucide-calendar',
	Zulassungsschein: 'lucide-check-circle',
	Arbeiten: 'lucide-wrench',
	BildSchaden: { icon: 'lucide:camera', action: () => openCloudinaryWidgetSchaden() },
	BildFertig: { icon: 'lucide:camera', action: () => openCloudinaryWidgetFertig() },
	Rechnung: { icon: 'lucide:euro', action: () => openCloudinaryWidgetRechnung() },
	Auftrag: { icon: 'lucide:euro', action: () => openCloudinaryWidgetAuftrag() },
	Lieferschein: {icon: 'lucide-package',  action: () => openCloudinaryWidgetLieferschein() },
	Kundennr: 'lucide-hash',
	Firma: 'lucide-building-2',
	PLZ: 'lucide-house',
	FIN: 'lucide-hash',
	KMStand: 'lucide-hash',
	Hubraum: 'lucide-car-front',
	Nat_Code: 'lucide-hash',
	Pickerl: 'lucide-check-circle',
	PS: 'lucide-car-front',
	KW: 'lucide-car-front',
	Motorcode: 'lucide-hash',
	Kraftstoff: 'lucide-fuel',
	Farbcode: 'lucide-hash',
	Infotext: 'lucide-info',
	Auftragnummer: 'lucide-hash',
	
	Geschlecht: 'lucide-user'
};
