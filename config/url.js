export default {
	"login": { url: "maya/connect/credentials" },
	"login-scanner": { url: "maya/connect/qr-code" },
	"get-profile": { url: "maya/profile" },
	"update-profile": { url: "maya/action/profile" },

	//Goods In stock
	"get-stock-deliveries" : { url: "maya/org/{}/warehouses/{}/incoming/stock-deliveries" },
	"get-stock-delivery" : { url: "maya/org/{}/procurement/stock-deliveries/all/{}" },

    //Goods Out
	"get-delivery-notes" : { url: "maya/org/{}/warehouses/{}/dispatching/delivery-notes" },
	"get-returns" : { url: "maya/org/{}/warehouses/{}/dispatching/fulfilment-returns" },
	"get-delivery-note" : { url: 'maya/org/{}/warehouses/{}/dispatching/delivery-notes/{}'},
	"get-return" : { url: 'maya/org/{}/warehouses/{}/dispatching/fulfilment-returns/{}'},

	//locations
	"get-locations" : { url: "maya/org/{}/warehouses/{}/locations" },
	"get-areas" : { url: "maya/org/{}/warehouses/{}/areas" },
	"get-location" : { url: "maya/org/{}/warehouses/{}/locations/{}" },
	"get-area" : { url: "maya/org/{}/warehouses/{}/areas/{}" },

	//Inventory
	'get-families' :  { url: "" },
	'get-stored-items' :  { url: "maya/org/{}/warehouses/{}/inventory/stored-items" },
	'get-stored-item' :  { url: "maya/org/{}/warehouses/{}/inventory/stored-items/{}" },

	//scanner
	'get-scanner' : { url: "maya/org/{}/warehouses/{}/scanners/{}" },

	//deliveries
	"get-deliveries" : { url: "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries" },
	"get-delivery" : { url: "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries/{}" },
	"set-delivery-received" : { url: "maya/action/pallet-delivery/{}/received" },
	"set-delivery-booking-in" : { url: "maya/action/pallet-delivery/{}/start-booking" },
	"set-delivery-booked-in" : { url: "maya/action/pallet-delivery/{}/booked-in" },
	"get-pallets-delivery" : { url: "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries/{}/pallets" },


	//pallet
	'get-pallets' :  { url: "maya/org/{}/warehouses/{}/inventory/pallets" },
	'get-pallet' :  { url: "maya/org/{}/warehouses/{}/inventory/pallets/{}" },
	'set-pallet-location' : { url: "maya/action/location/{}/pallet/{}" },
	'set-pallet-not-received' : { url: "maya/action/pallet/{}/not-received" },
	'undo-pallet-not-received' : { url: "maya/action/pallet/{}/undo-not-received" },
};