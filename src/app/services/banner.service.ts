import { Injectable } from '@angular/core';
import { ApiSharedService } from './api-shared.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private apiService: ApiSharedService) {}

  increaseCount(id, type) {
    if (type && type == 'banner') {
      this.apiService.increaseBannerCount(id).subscribe((res) => {});
    }
    if (type && type == 'offer') {
      this.apiService.increaseOfferCount(id).subscribe((res) => {});
    }
  }

  redirectToUrl(url) {
    if (url != null) {
      //  this.window.open(url, '_blank');
    }
  }
}
