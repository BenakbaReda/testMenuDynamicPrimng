// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import {DEV_BASE_APP_SVR,  DEV_BASE_AUTH_SVR } from './environment.const';

const  BaseUrl_Account: string = DEV_BASE_AUTH_SVR;
const  BaseUrl_App: string = DEV_BASE_APP_SVR;


export const environment = {
  production: false,
  api: {
    BaseUrlAccounts: BaseUrl_Account,
    BaseUrlApp: BaseUrl_App,
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
