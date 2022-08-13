// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //baseUrl: 'https://uatapi.yellowpages.ae/',
  baseUrl: 'http://209.182.237.239:8080/',
  websiteUrl: 'http://89.233.105.74',
  fcm_server_key:
    'AAAACp5fy8w:APA91bHP_iYVgcs5VRmZS8iCOzDveWxv9P4xj2qVpbh-RjtR9ayUiuVt0FUK_Q5LW0mPpNeTc-HUFK8SmdBoTZKe-Ow1g8ojGunjOmu7IjgNX74eVX1JrIzv85z8jVVfIggpdA_qfhh9',
  firebase: {
    apiKey: 'AIzaSyBPfcrpHcWhJxyjA-2Twfi07m5-BdTndOk',
    authDomain: 'yellow-pages-uae.firebaseapp.com',
    databaseURL: 'https://yellow-pages-uae.firebaseio.com',
    projectId: 'yellow-pages-uae',
    storageBucket: 'yellow-pages-uae.appspot.com',
    messagingSenderId: '45606751180',
    appId: '1:45606751180:web:803d9644a00d2923ffeb69',
    measurementId: 'G-1LW32EPS1Y',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
