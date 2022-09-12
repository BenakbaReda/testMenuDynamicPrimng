
import {PROD_BASE_APP_SVR,  PROD_BASE_AUTH_SVR } from './environment.const';

const  BaseUrl_Account: string = PROD_BASE_AUTH_SVR;
const  BaseUrl_App: string = PROD_BASE_APP_SVR;


export const environment = {
  production: false,
  api: {
    BaseUrlAccounts: BaseUrl_Account,
    BaseUrlApp: BaseUrl_App,
  }

};
