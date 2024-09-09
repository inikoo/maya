export { default as Login } from './auth/Login';
export { default as LoginScanner } from './auth/Scanner';

export { default as Profile } from './Profile';
export { default as ProfileDetail } from './Profile/Detail';
export { default as Organisation } from './SetUpOrganisation/Organisation';
export { default as Fullfilment } from './SetUpFullfilment/Fullfilment';
export { default as SelectOrganisation } from './SetUpOrganisation';
export { default as SelectFullfilment } from './SetUpFullfilment';
export { default as Notification } from './Notifications';
export { default as Dashboard } from './Dashboard';

//warehouse
export { default as Warehouse } from './Warehouse';

//fullfilment Dasboard
export { default as DashboardFullfilment } from './Fullfilment/Dashboard';
export { default as FullfilmentNavigation } from './Fullfilment/Navigator';

//locations fullfilment
export { default as Locations } from './Locations/Location';
export { default as LocationInFulfilment } from './Locations/Location/Detail';
export { default as LocationPallet } from './Locations/Location/Pallet';
export { default as LocationScanner } from './Locations/Location/Scanner';

//global Scanners
export { default as GlobalSearch } from './GlobalScanner';
export { default as GlobalScanner } from './GlobalScanner/Scanner';


// Inventory
export { default as InventoryDashboard } from './Inventory/Dashboard';
export { default as InventoryNavigation } from './Inventory/Navigator';

//orgStock
export { default as OrgStocks } from './Inventory/OrgStock';
export { default as OrgStock } from './Inventory/OrgStock/Detail';

//palet
export { default as Pallets } from './Inventory/Pallet';
export { default as Pallet } from './Inventory/Pallet/Detail';
export { default as PalletScanner } from './Inventory/Pallet/Scanner';
export { default as ChangeLocationPalletByScanner } from './Inventory/Pallet/Detail/ChangeLocationByScanner';

//stored Items
export { default as StoredItems } from './Inventory/StoredItems';
export { default as StoredItem } from './Inventory/StoredItems/Detail';

//Locations
export { default as  LocationsDashboard } from './Locations/Dashboard';
export { default as  LocationsNavigation } from './Locations/Navigator';
export { default as  Area } from './Locations/Area';
export { default as  AreaDetail } from './Locations/Area/Detail';
export { default as  AreaLocation } from './Locations/Area/Location/index';
export { default as  Location } from './Locations/Location';

//Goods In
export { default as GoodsInDashboard } from './GoodsIn/Dashboard';
export { default as GoodsInNavigation } from './GoodsIn/Navigator';

export { default as StockDeliveries } from './GoodsIn/StockDeliveries';

//delivery
export { default as Deliveries } from './GoodsIn/Delivery';
export { default as DeliveryDetail } from './GoodsIn/Delivery/Detail';
export { default as DeliveryPallet } from './GoodsIn/Delivery/Pallet';
export { default as DeliveryScanner } from './GoodsIn/Delivery/Scanner';

//Goods Out
export { default as GoodsOutDashboard } from './GoodsOut/Dashboard';
export { default as GoodsOutNavigation } from './GoodsOut/Navigator';

export { default as DeliveryNotes } from './GoodsOut/DeliveryNotes';

//return
export { default as Returns } from './GoodsOut/Return';
export { default as StoredItemsReturns } from './GoodsOut/Return/StoredItems';
export { default as PalletReturns } from './GoodsOut/Return/Pallet';
export { default as ReturnDetail } from './GoodsOut/Return/Detail';
export { default as ReturnScanner } from './GoodsOut/Return/Scanner';