export default {
	//user
	"login-form" : "api/tokens/credentials",
	"login-scanner" : "api/tokens/qr-code",
	"profile" : "api/profile",
	"firebase-token" : "api/firebase-token",



	//working places
	'hr-working-places' : "api/hr/workplaces",
	'hr-retrive-working-places' : "api/hr/workplaces/{}",
	'hr-working-places-time-sheets' : "api/hr/workplaces/{}/clocking-machines",


	//clocking machines
	'hr-clocking-machines' : "api/hr/clocking-machines",
	'hr-clocking-machines-detail' : "api/hr/clocking-machines/{}",
	'hr-clocking-machines-add' : "api/hr/clocking-machines/{}/clockings",


	//warehouse
	'warehouse-index' : 'api/org/{}/warehouses',
	'warehouse-count-data' : 'api/org/{}/warehouses/{}',


	//locatiom
	'locations-index' : 'api/org/{}/warehouses/{}/locations',
	'locations-show' : 'api/org/{}/warehouses/{}/locations/{}',
	'location-pallet-index' : 'api/org/{}/warehouses/{}/fulfilments/{}/locations/{}/pallets',

	//pallet
	'pallet-index' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets',
	'pallet-show' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets/{}',
	'pallet-location' : 'api/org/{}/warehouses/{}/locations/{}/pallets/{}',
	'pallet-return' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets/{}/return',
	'pallet-change-sattus-state' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets/{}',


	//delivery
	'delivery-index' : "api/org/{}/warehouses/{}/pallet-deliveries",
	'delivery-show' : "api/org/{}/warehouses/{}/pallet-deliveries/{}",
	'delivery-pallet-index' : "api/org/{}/warehouses/{}/pallet-deliveries/{}/pallets",


	//return
	'return-index' : "api/org/{}/warehouses/{}/pallet-returns",
	'return-show' : "api/org/{}/warehouses/{}/pallet-returns/{}",
	'return-pallet-index' : "api/org/{}/warehouses/{}/pallet-returns/{}/pallets",

	'global-search' : 'api/org/{}/warehouses/{}/scanners/{}'

};