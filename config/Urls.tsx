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
	'locations-index' : 'api/org/{}/warehouses/{}/locations',
	'locations-show' : 'api/org/{}/warehouses/locations/{}'
};