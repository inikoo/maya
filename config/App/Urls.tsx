export default {
	//user
	"login-form" : "maya/connect/credentials",
	"login-scanner" : "maya/connect/qr-code",
	"profile" : "maya/profile",
	'update-profile' : 'maya/action/profile',
	"firebase-token" : "maya/firebase-token",


	//Notification
	'notification' : 'maya/profile/notifications',
	'notification-read' : 'maya/profile/notifications/{}',

	//working places
	'hr-working-places' : "maya/org/{}/hr/workplaces",
	'hr-retrive-working-places' : "/maya/org/{}/hr/workplaces/{}",
	'hr-working-places-time-sheets' : "maya/org/{}/hr/workplaces/{}/clocking-machines",

	//clocking machines
	'hr-clocking-machines' : "maya/org/{}/hr/clocking-machines",

	//warehouse
	'warehouse-index' : 'maya/org/{}/warehouses',
	'warehouse-count-data' : 'maya/org/{}/warehouses/{}',

	//location
	'locations-index' : 'maya/org/{}/warehouses/{}/locations',
	'locations-show' : 'maya/org/{}/warehouses/{}/locations/{}',
	'location-pallet-index' : 'maya/org/{}/warehouses/{}/fulfilments/{}/locations/{}/pallets',

	//pallet
	'pallet-index' : 'maya/org/{}/warehouses/{}/fulfilments/{}/pallets',
	'pallet-show' : 'maya/org/{}/warehouses/{}/fulfilments/{}/pallets/{}',
	'pallet-location' : 'maya/action/pallet/{}/location/{}',
	'pallet-return' : 'maya/action/pallet/{}/return',
	'pallet-change-sattus-state' : 'maya/action/pallet/{}',

	//delivery
	'delivery-index' : "maya/org/{}/warehouses/{}/pallet-deliveries",
	'delivery-show' : "api/org/{}/warehouses/{}/pallet-deliveries/{}",
	'delivery-pallet-index' : "api/org/{}/warehouses/{}/pallet-deliveries/{}/pallets",

	//return
	'return-index' : "api/org/{}/warehouses/{}/pallet-returns",
	'return-show' : "api/org/{}/warehouses/{}/pallet-returns/{}",
	'return-pallet-index' : "api/org/{}/warehouses/{}/pallet-returns/{}/pallets",

	//global search
	'global-search' : 'api/org/{}/warehouses/{}/scanners/{}'
};