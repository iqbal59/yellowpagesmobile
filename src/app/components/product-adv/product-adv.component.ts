import { Component, Input, OnInit } from '@angular/core';
import { ApiSharedService } from 'src/app/services/api-shared.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-product-adv',
  templateUrl: './product-adv.component.html',
  styleUrls: ['./product-adv.component.scss'],
})
export class ProductAdvComponent implements OnInit {
  AllGuestBannersTemp: any[] = [];
  bannerTop;
  @Input() bannerPosition;
  @Input() renderServerSide = false;
  @Input() image;

  constructor(
    private _apiSharedService: ApiSharedService,
    public bannerService: BannerService // public searchproductV2Service: SearchProductV2Service,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.image && this.image != 'na') {
      this.getImageContent({ image: this.image });
    } else {
      this.getAllBannerByPageName();
    }
  }

  getAllBannerByPageName() {
    this._apiSharedService
      .getBannerByPageName(this.bannerPosition)
      .subscribe((res) => {
        if (this.renderServerSide) {
          this.getImageContent(res[this.bannerPosition]);
        } else {
          // if (isPlatformBrowser(this.platformId)) {
          this.getImageContent(res[this.bannerPosition]);
          //}
        }
      });
  }

  getImageContent(item) {
    if (item && item.image) {
      this._apiSharedService.getImageContent(item.image.id).subscribe(
        (res) => {
          if (res.imageContent) {
            item['imageContent'] = res.imageContent;
            item['imageContent'] =
              res.imageContentContentType + ',' + res.imageContent;
          } else {
            item['imageContent'] = null;
          }
          if (this.image && this.image != 'na') {
            this.bannerTop = item;
            if (!this.bannerTop.link) this.bannerTop.link = this.image.link;
          } else if (item.webPageName == this.bannerPosition) {
            this.bannerTop = item;
          }
        },
        (error) => {}
      );
    }
  }
}
