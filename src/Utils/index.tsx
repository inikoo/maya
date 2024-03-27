import {WriteCredential, UpdateCredential, RemoveCredential} from "./auth";
import Request from "./request";


const PrefixScanner = e => {
    let dataWithoutPrefix;
  
    if (e.startsWith("loc-")) {
      dataWithoutPrefix = e.substring(4);
    } else if (e.startsWith("pal-")) {
      dataWithoutPrefix = e.substring(4);
    } else if (e.startsWith("item-")) {
      dataWithoutPrefix = e.substring(5);
    } else {
      // Jika prefix tidak dikenali, biarkan datanya tidak berubah
      dataWithoutPrefix = e;
    }
  
    return dataWithoutPrefix
  };



export { WriteCredential, UpdateCredential, RemoveCredential, Request, PrefixScanner};