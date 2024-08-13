export { default as Dashboard } from './Dashboard';
export { default as Login } from './auth/Login';
export { default as LoginScanner } from './auth/Scanner';
export { default as Profile } from './Profile';
export { default as ProfileDetail } from './Profile/Detail';
export { default as Organisation } from './Profile/Organisation';
export { default as Fullfilment } from './Profile/Fullfilment';
export { default as Notification } from './Notifications';

//warehouse
export { default as Warehouse } from './Warehouse';

//locations
export { default as Locations } from './Location';
export { default as Location } from './Location/Detail';
export { default as LocationPallet } from './Location/Pallet';
export { default as LocationScanner } from './Location/Scanner';

//palet
export { default as Pallets } from './Pallet';
export { default as Pallet } from './Pallet/Detail';
export { default as PalletScanner } from './Pallet/Scanner';
export { default as ChangeLocationByScanner } from './Pallet/Detail/ChangeLocationByScanner';

//stored Items
export { default as StoredItems } from './StoredItems';

//delivery
export { default as Deliveries } from './Delivery';
export { default as DeliveryDetail } from './Delivery/Detail';
export { default as DeliveryPallet } from './Delivery/Pallet';
export { default as DeliveryScanner } from './Delivery/Scanner';


//return
export { default as PalletReturns } from './Return/PalletReturns';
export { default as StoredItemsReturns } from './Return/StoredItemsReturns';
export { default as ReturnDetail } from './Return/Detail';
export { default as ReturnScanner } from './Return/Scanner';

//global Scanners
export { default as GlobalSearch } from './GlobalScanner';
export { default as GlobalScanner } from './GlobalScanner/Scanner';

//setup
export { default as SelectOrganisation } from './Dashboard/SetUpOrganisation';
export { default as SelectFullfilment } from './Dashboard/SetUpFullfilment';