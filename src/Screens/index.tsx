export { default as Login } from './auth/Login';
export { default as LoginScanner } from './auth/Scanner';

export { default as Profile } from './Profile';
export { default as ProfileDetail } from './Profile/Detail';
export { default as Organisation } from './Profile/Organisation';
export { default as Fullfilment } from './Profile/Fullfilment';
export { default as SelectOrganisation } from './SetUpOrganisation';
export { default as SelectFullfilment } from './SetUpFullfilment';
export { default as Notification } from './Notifications';
export { default as Dashboard } from './Dashboard';

//warehouse
export { default as Warehouse } from './Warehouse';

//fullfilment Dasboard
export { default as DashboardFullfilment } from './Fullfilment/Dashboard';
export { default as FullfilmentNavigation } from './Fullfilment/Navigator';

//locations
export { default as Locations } from './Fullfilment/Location';
export { default as Location } from './Fullfilment/Location/Detail';
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
