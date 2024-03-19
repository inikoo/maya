export default {
	//user
	"login-form" : "api/tokens/credentials",
	"login-scanner" : "api/tokens/qr-code",
	"profile" : "api/profile",



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


	//locatiom
	'locations-index' : 'api/org/{}/warehouses/{}/locations',
	'locations-show' : 'api/org/{}/warehouses/{}/locations/{}',
	'location-pallate-index' : 'api/org/{}/warehouses/{}/fulfilments/{}/locations/{}/pallets',

	//pallete
	'pallate-index' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets',
	'pallate-show' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets/{}',
	'pallete-location' : 'api/org/{}/warehouses/{}/locations/{}/pallets/{}',
	'pallete-return' : 'api/org/{}/warehouses/{}/fulfilments/{}/pallets/{}/return',

};