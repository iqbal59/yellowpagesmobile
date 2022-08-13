import { Injectable } from '@angular/core';
import { ApiSharedService } from './api-shared.service';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  // isMobile = false;
  //isTablet = false;
  allBanners;
  homppageBannerNames =
    'Header Right,Header Middle,Header Left,Header,Blog Left,Latest Product Left,Popular Product Right';
  headerRight = null;
  headerCenter = null;
  headerLeft = null;
  header = null;
  topRight = null;
  productRight = null;
  productLeft = null;
  altImgText = null;
  constructor(private _apiSharedService: ApiSharedService) {
    // this.isMobile = this.deviceDetectorService.isMobile();
    // this.isTablet = this.deviceDetectorService.isTablet();
  }

  getAllBannerByPageName(banners) {
    if (this.allBanners) {
      this.getBannerImages(banners);
    } else {
      this._apiSharedService
        .getBannerByPageName(this.homppageBannerNames)
        .subscribe((res) => {
          this.allBanners = res;
          this.getBannerImages(banners);
        });
    }
  }

  getBannerImages(banners) {
    for (let bannerName in this.allBanners) {
      if (banners.indexOf(bannerName) >= 0)
        this.getImageContent(this.allBanners[bannerName]);
    }
  }

  getImageContent(item) {
    if (item && item.image && !item.imageContent) {
      this._apiSharedService.getImageContent(item.image.id).subscribe(
        (res) => {
          if (res.imageContent) {
            item['imageContent'] = res.imageContent;
            item['imageContent'] =
              res.imageContentContentType + ',' + res.imageContent;
            item['altImgText'] = res.imageName;
          } else {
            item['imageContent'] = null;
            item['altImgText'] = null;
          }
          if (item.webPageName == 'Header Right') {
            this.headerRight = item;
          } else if (item.webPageName == 'Header Middle') {
            this.headerCenter = item;
          } else if (item.webPageName == 'Header Left') {
            this.headerLeft = item;
          } else if (item.webPageName == 'Header') {
            this.header = item;
          } else if (item.webPageName == 'Blog Left') {
            this.topRight = item;
          } else if (item.webPageName == 'Popular Product Right') {
            this.productRight = item;
          } else if (item.webPageName == 'Latest Product Left') {
            this.productLeft = item;
          }
        },
        (error) => {}
      );
    }
  }

  // getProductShimmerImageHeight() {
  //   if (this.isMobile) {
  //     return "150px";
  //   } else if (this.isTablet) {
  //     return "165px";
  //   } else {
  //     return "205px";
  //   }
  // }

  // getProductShimmerImageWidth() {
  //   if (this.isMobile) {
  //     return "140px";
  //   } else if (this.isTablet) {
  //     return "160px";
  //   } else {
  //     return "285px";
  //   }
  // }

  // getProductShimmerTitleHeight() {
  //   if (this.isMobile) {
  //     return "30px";
  //   } else {
  //     return "40px";
  //   }
  // }

  // getProductShimmerTitleWidth() {
  //   if (this.isMobile) {
  //     return "140px";
  //   } else if (this.isTablet) {
  //     return "145px";
  //   } else {
  //     return "220px";
  //   }
  // }

  // getAdvertisementShimmerHeight() {
  //   if (this.isMobile) {
  //     return "300px";
  //   } else if (this.isTablet) {
  //     return "300px";
  //   } else {
  //     return "385px";
  //   }
  // }

  // getAdvertisementShimmerWidth() {
  //   if (this.isMobile) {
  //     return "200px";
  //   } else if (this.isTablet) {
  //     return "175px";
  //   } else {
  //     return "250px";
  //   }
  // }

  // getSearchAdvShimmerImageHeight() {
  //   if (this.isMobile) {
  //     return "150px";
  //   } else if (this.isTablet) {
  //     return "400px";
  //   } else {
  //     return "420px";
  //   }
  // }

  // getSearchAdvShimmerImageWidth() {
  //   if (this.isMobile) {
  //     return "140px";
  //   } else if (this.isTablet) {
  //     return "100%";
  //   } else {
  //     return "100%";
  //   }
  // }

  // getHomeAdvShimmerImageHeight() {
  //   if (this.isMobile) {
  //     return "150px";
  //   } else if (this.isTablet) {
  //     return "205px";
  //   } else {
  //     return "205px";
  //   }
  // }

  // getHomeAdvShimmerImageWidth() {
  //   if (this.isMobile) {
  //     return "140px";
  //   } else if (this.isTablet) {
  //     return "200px";
  //   } else {
  //     return "390px";
  //   }
  // }

  // getBlogImgShimmerImageHeight() {
  //   if (this.isMobile) {
  //     return "140px";
  //   } else if (this.isTablet) {
  //     return "175px";
  //   } else {
  //     return "190px";
  //   }
  // }

  // getBlogImgShimmerImageWidth() {
  //   if (this.isMobile) {
  //     return "140px";
  //   } else if (this.isTablet) {
  //     return "150px";
  //   } else {
  //     return "295px";
  //   }
  // }

  // getBlogTitleShimmerImageHeight() {
  //   if (this.isMobile) {
  //     return "25px";
  //   } else if (this.isTablet) {
  //     return "25px";
  //   } else {
  //     return "25px";
  //   }
  // }

  // getBlogTitleShimmerImageWidthDesc() {
  //   if (this.isMobile) {
  //     return "295px";
  //   } else if (this.isTablet) {
  //     return "150px";
  //   } else {
  //     return "295px";
  //   }
  // }

  // getBlogTitleShimmerImageWidth() {
  //   if (this.isMobile) {
  //     return "135px";
  //   } else if (this.isTablet) {
  //     return "135px";
  //   } else {
  //     return "250px";
  //   }
  // }

  // getBlogTitleShimmerImageHeightDesc() {
  //   if (this.isMobile) {
  //     return "75px";
  //   } else if (this.isTablet) {
  //     return "75px";
  //   } else {
  //     return "75px";
  //   }
  // }

  // getSearchListAdShimmerImageHeight() {
  //   if (this.isMobile) {
  //     return "50px";
  //   } else if (this.isTablet) {
  //     return "100px";
  //   } else {
  //     return "170px";
  //   }
  // }

  // getSearchListAdShimmerImageWidth() {
  //   if (this.isMobile) {
  //     return "100%";
  //   } else if (this.isTablet) {
  //     return "100%";
  //   } else {
  //     return "100%";
  //   }
  // }
}
