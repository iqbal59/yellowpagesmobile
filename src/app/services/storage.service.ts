import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static USER_ACCESS_TOKEN: string = 'userAccessToken';
  public static LOGIN: string = 'login';
  public static USER_ID: string = 'userId';
  public static SELECTED_FILTERS: string = 'selectedFilters';
  public static SELECTED_LEAD_FILTERS: string = 'selectedLeadFilters';
  public static SEARCH_FILTERS: string = 'searchFilters';
  public static LOGGED_IN_USER_DETAILS: string = 'loggedInUserDetails';
  public static ASKED_FOR_PUSH_NOTIFICATIONS: string =
    'askedForPushNotifications';
  constructor(
    // private localStorage:$window.localStorage,
    private platform: Platform
  ) {}

  getItem(item) {
    let value;

    if (isPlatformBrowser(this.platform)) {
      value = localStorage.getItem(item);
      try {
        if (value && typeof JSON.parse(value) == 'object') {
          return JSON.parse(value);
        } else {
          return value;
        }
      } catch (e) {
        return value;
      }
    } else {
      return null;
    }
  }

  setItem(key, value) {
    if (isPlatformBrowser(this.platform)) {
      if (value && typeof value == 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    }
  }

  removeItem(item) {
    if (isPlatformBrowser(this.platform)) localStorage.removeItem(item);
  }

  removeAll() {
    if (isPlatformBrowser(this.platform)) {
      var askedForPushNotifications = this.getItem(
        StorageService.ASKED_FOR_PUSH_NOTIFICATIONS
      );
      localStorage.clear();
      this.setItem(
        StorageService.ASKED_FOR_PUSH_NOTIFICATIONS,
        askedForPushNotifications
      );
    }
  }
}
