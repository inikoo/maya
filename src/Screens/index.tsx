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
export { default as Locations } from './Fullfilment/Location';
export { default as LocationInFulfilment } from './Fullfilment/Location/Detail';
export { default as LocationPallet } from './Fullfilment/Location/Pallet';
export { default as LocationScanner } from './Fullfilment/Location/Scanner';

//palet
export { default as Pallets } from './Fullfilment/Pallet';
export { default as Pallet } from './Fullfilment/Pallet/Detail';
export { default as PalletScanner } from './Fullfilment/Pallet/Scanner';
export { default as ChangeLocationPalletByScanner } from './Fullfilment/Pallet/Detail/ChangeLocationByScanner';

//stored Items
export { default as StoredItems } from './Fullfilment/StoredItems';

//delivery
export { default as Deliveries } from './Fullfilment/Delivery';
export { default as DeliveryDetail } from './Fullfilment/Delivery/Detail';
export { default as DeliveryPallet } from './Fullfilment/Delivery/Pallet';
export { default as DeliveryScanner } from './Fullfilment/Delivery/Scanner';


//return
export { default as PalletReturns } from './Fullfilment/Return/PalletReturns';
export { default as StoredItemsReturns } from './Fullfilment/Return/StoredItemsReturns';
export { default as ReturnDetail } from './Fullfilment/Return/Detail';
export { default as ReturnScanner } from './Fullfilment/Return/Scanner';

//global Scanners
export { default as GlobalSearch } from './GlobalScanner';
export { default as GlobalScanner } from './GlobalScanner/Scanner';

// Production 
export { default as ProductionNavigation } from './Production/Navigator';
export { default as DashboardProduction } from './Production/Dashboard';


// Inventory
export { default as InventoryDashboard } from './Inventory/Dashboard';
export { default as InventoryNavigation } from './Inventory/Navigator';
export { default as SKU } from './Inventory/Sku';
export { default as SKUFamily } from './Inventory/SkuFamily';


//Dispatching
export { default as  DispatchingDashboard } from './Dispatching/Dashboard';


//Locations
export { default as  LocationsDashboard } from './Locations/Dashboard';
export { default as  LocationsNavigation } from './Locations/Navigator';
export { default as  Area } from './Locations/Area';
export { default as  WarehouseInLocation } from './Locations/Warehouse';
export { default as  Location } from './Locations/Location';

//Procurement
export { default as  ProcurementDashboard } from './Procurement/Dashboard';
export { default as  ProcurementNavigation } from './Procurement/Navigator';
export { default as  Agents } from './Procurement/Agents';
export { default as  Patners } from './Procurement/Patners';
export { default as  PurchasedOrder } from './Procurement/PurchasedOrder';
export { default as  Suppliers } from './Procurement/Suppliers';
