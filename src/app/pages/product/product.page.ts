import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSharedService } from 'src/app/services/api-shared.service';
import { UrlService } from 'src/app/services/url.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  title = 'Buy Products At Yellow Pages';
  public prodDetails: any;
  prodSpecs;
  prodId;

  ProductLinkCount = 4;
  businessDays;
  businessHours;
  activeClassTab = 'selpro';
  slidesStore: any[];
  //activeSlides: SlidesOutputData;
  cardata: any[];
  divStyle = '';
  indexPosition = 0;

  // customOptions: OwlOptions = {
  //   loop: true,
  //   dots: true,
  //   nav: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //   },
  // };

  units;

  constructor(
    private route: ActivatedRoute,
    private _apiSharedService: ApiSharedService,
    private urlService: UrlService
  ) {}

  ngOnInit() {
    this.prodId = this.route.snapshot.paramMap.get('id');
    this._apiSharedService
      .getProductDetails(
        this.prodId,
        null
        // this.authservice.loggedInUserDetails
        //   ? this.authservice.loggedInUserDetails.id
        //   : null
      )
      .subscribe(
        (res) => {
          this.prodDetails = res;
          if (
            this.prodDetails &&
            this.prodDetails.seller &&
            this.prodDetails.seller.sellerBusinessHours
          ) {
            let businessHours =
              this.prodDetails.seller.sellerBusinessHours.split('@@@');
            if (
              businessHours &&
              businessHours[0] &&
              businessHours[0] != '' &&
              businessHours[0].split('-') &&
              businessHours[0].split('-').length == 2 &&
              businessHours[0].split('-')[0].trim() != '' &&
              businessHours[0].split('-')[1].trim() != ''
            ) {
              this.businessDays = businessHours[0];
            }
            if (
              businessHours &&
              businessHours[1] &&
              businessHours[2] &&
              businessHours[1] != '' &&
              businessHours[2] != ''
            ) {
              this.businessHours =
                ' from ' + businessHours[1] + ' to ' + businessHours[2];
            }
          }
          this.prodSpecs = JSON.parse(res.specifications);
          // if (isPlatformBrowser(this.platformId)) {
          //   if (res.images && res.images.length > 0) {
          //     res.images.forEach((element) => {
          //       this.imageService.getImageContent(element);
          //     });
          //   }
          // }
        },
        (error) => {}
      );
  }

  sellerUrl(urlString) {
    console.log(urlString);
    window.open(environment.websiteUrl + urlString, '_system');
  }
}
