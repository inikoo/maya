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
	'pallet-show' : 'maya/org/{}/warehouses/{}/inventory/pallets/{}',
	'pallet-location' : 'maya/action/location/{}/pallet/{}',
	'pallet-return' : 'maya/action/pallet/{}/return',
	'pallet-change-status-state' : 'maya/action/pallet/{}',
	'set-pallet-rental' : 'maya/action/pallet/{}/set-rental',
	'set-pallet-not-reiceved' : 'maya/action/pallet/{}/not-received',
	'set-pallet-undo' : 'maya/action/pallet/{}/undo-not-received',
	'set-pallet-damaged' : 'maya/action/pallet/{}/damaged',
	'set-pallet-lost' : 'maya/action/pallet/{}/lost',



	'set-pallet-pallet-and-stored-item-pick' : 'maya/action/pallet-return-item/{}/pick',
	'set-pallet-pallet-and-stored-item-undo' : 'maya/action/pallet-return-item/{}/undo-pick',
	'set-pallet-pallet-and-stored-item-not-picked' : 'maya/action/pallet-return-item/{}/not-picked',

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
	'locations-show-by-code' : 'maya/org/{}/warehouses/{}/locations/code/{}',
	'location-pallet-index' : 'maya/org/{}/warehouses/{}/fulfilments/{}/locations/{}/pallets',

	//delivery
	'delivery-index' : "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries",
	'delivery-show' : "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries/{}",
	'delivery-pallet-index' : "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries/{}/pallets",
	'delivery-status-recived' : "maya/action/pallet-delivery/{}/received",
	'delivery-status-not-recived' : "",
	'delivery-status-booking-in' : "maya/action/pallet-delivery/{}/start-booking",
	'delivery-status-booked-in' : "maya/action/pallet-delivery/{}/booked-in",

	'delivery-notes-index' : 'maya/org/1/warehouses/1/dispatching/delivery-notes',
	'delivery-notes-show' : 'maya/org/{}/warehouses/{}/dispatching/delivery-notes/{}',

	//return
	'return-index' : "maya/org/1/warehouses/1/dispatching/fulfilment-returns",
	'return-show' : "maya/org/{}/warehouses/{}/dispatching/fulfilment-returns/{}",
	'return-pallet-index' : "maya/org/{}/warehouses/{}/dispatching/fulfilment-returns/{}/pallets",
	'return-stored-items-index' : "maya/org/{}/warehouses/{}/dispatching/fulfilment-returns/{}/stored-items",
	'return-status-confirmed' : 'maya/action/pallet-return/{}/confirm',
	'retrun-status-picking' : 'maya/action/pallet-return/{}/start-picking',
	'return-status-picked' : 'maya/action/pallet-return/{}/picked',
	'retrun-status-dispatch' : 'maya/action/pallet-return/{}/dispatch',

	//global search
	'global-search' : 'maya/org/{}/warehouses/{}/scanners',
	'global-search-scanner' : 'maya/org/{}/warehouses/{}/scanners/{}',


	'rentals-index' : 'maya/org/{}/fulfilment/{}/rentals'
};