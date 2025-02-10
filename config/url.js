export default {
	"login": { url: "maya/connect/credentials" },
	"login-scanner": { url: "maya/connect/qr-code" },
	"get-profile": { url: "maya/profile" },
	"update-profile": { url: "maya/action/profile" },

	//Goods In
	"get-stock-deliveries" : { url: "maya/org/{}/warehouses/{}/incoming/stock-deliveries" },
	"get-deliveries" : { url: "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries" },
	"get-delivery" : { url: "maya/org/{}/warehouses/{}/incoming/fulfilment-deliveries/{}" },
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
	'get-pallets' :  { url: "maya/org/{}/warehouses/{}/inventory/pallets" },
	'get-stored-items' :  { url: "maya/org/{}/warehouses/{}/inventory/stored-items" },
	'get-pallet' :  { url: "maya/org/{}/warehouses/{}/inventory/pallets/{}" },
	'get-stored-item' :  { url: "maya/org/{}/warehouses/{}/inventory/stored-items/{}" },


	//scanner
	'get-scanner' : { url: "maya/org/{}/warehouses/{}/scanners/{}" },
};