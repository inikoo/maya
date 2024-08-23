export default {
	//user
	"login-form" : "maya/connect/credentials",
	"login-scanner" : "maya/connect/qr-code",
	"profile" : "maya/profile",
	'update-profile' : 'maya/action/profile',
	"firebase-token" : "maya/firebase-token",


	//Notification
	'notification' : 'maya/profile/notifications',
	'notification-read' : 'maya/action/notification/{}',


	//Org Stock
	'org-stock-index' : 'maya/org/{}/warehouses/{}/inventory/stocks',
	'org-stock-show' : 'maya/org/{}/warehouses/{}/inventory/stocks/{}',

	//pallet
	'pallet-index' : 'maya/org/{}/warehouses/{}/inventory/pallets',
	'pallet-show' : 'maya/org/1/warehouses/1/inventory/pallets/204',
	'pallet-location' : 'maya/action/location/{}/pallet/{}',
	'pallet-return' : 'maya/action/pallet/{}/return',
	'pallet-change-status-state' : 'maya/action/pallet/{}',

	'stock-deliveries-index' : 'maya/org/{}/warehouses/{}/incoming/stock-deliveries',
	'stock-deliveries-show' : 'maya/org/{}/warehouses/{}/incoming/stock-deliveries/{}',

	//stored Items
	'stored-item-index' : 'maya/org/{}/warehouses/{}/fulfilments/{}/pallets/{}/stored-items',
	'stored-item-show' : 'maya/action/pallet/{}/stored-item/{}',

	//warehouse
	'warehouse-area-index' : 'maya/org/{}/warehouses/{}/areas',
	'warehouse-area-show' : 'maya/org/{}/warehouses/{}/areas/{}',

	//location
	'locations-index' : 'maya/org/{}/warehouses/{}/locations',
	'locations-show' : 'maya/org/{}/warehouses/{}/locations/{}',
	'locations-show-by-code' : 'maya/org/{}/warehouses/{}/locations/{}/code',
	'location-pallet-index' : 'maya/org/{}/warehouses/{}/fulfilments/{}/locations/{}/pallets',

	//delivery
	'delivery-index' : "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries",
	'delivery-show' : "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries/{}",
	'delivery-pallet-index' : "maya/org/{}/warehouses/{}/pallet-deliveries/{}/pallets",

	'delivery-notes-index' : 'maya/org/1/warehouses/1/dispatching/delivery-notes',
	'delivery-notes-show' : 'maya/org/{}/warehouses/{}/dispatching/delivery-notes/{}',

	//return
	'return-index' : "maya/org/{}/warehouses/{}/dispatching/returns",
	'return-show' : "maya/org/{}/warehouses/{}/dispatching/returns/{}",
	'return-pallet-index' : "maya/org/{}/warehouses/{}/pallet-returns/{}/pallets",

	//global search
	'global-search' : 'maya/org/{}/warehouses/{}/scanners',
	'global-search-scanner' : 'maya/org/{}/warehouses/{}/scanners/{}'
};