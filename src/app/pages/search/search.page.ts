import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KEYWORD } from 'src/app/constants/api-constants';
import { ApiSharedService } from 'src/app/services/api-shared.service';
import { ApiService } from 'src/app/services/api.service';
import { HomeSearchService } from 'src/app/services/home-search.service';
import { StorageService } from 'src/app/services/storage.service';
import { UrlService } from 'src/app/services/url.service';
import { environment } from 'src/environments/environment';
declare var inmSdk: any;
declare var googletag: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  location: string;
  searchText: string;
  searchTextType: string;
  keywordDetails;
  keywordDescription;

  selectedFilters;

  page;
  products = [];
  packageProducts;
  sponsoredProduct;
  filters;
  size = 12;
  totalLength = 0;
  filterDto;
  AllGuestBannersTemp: any[] = [];
  bannerTop;
  keyword;
  subcategoryDetails;

  blindKeywordDetails;

  showForm: boolean;
  subcategoryId;
  image;
  constructor(
    private homeSearchService: HomeSearchService,
    private route: ActivatedRoute,
    private _apiSharedService: ApiSharedService,
    private storageService: StorageService,
    private urlService: UrlService,
    private router: Router
  ) {
    this.searchTextType = 'keyword';
    this.page = 1;
  }

  ngOnInit() {
    //  Load Script SWISH AD
    const script = document.createElement('script');

    script.src = 'https://sdk.swishapps.ai/swish_ad_stack.js';
    script.async = true;
    script.onload = () => {
      const isConSentGiven = true;
      inmSdk.init(
        'etisalatYellowPages',
        'b7b6437171364a1e866a7e8fc8e4bb6b',
        'ypHP',
        isConSentGiven
      );
    };
    document.body.appendChild(script);
    //End Load script SWISH AD
    this.route.paramMap.subscribe((params) => {
      this.searchText = params.get('q');
      this.location = params.get('l');
      this.subcategoryId = params.get('id');
    });

    this.route.snapshot.queryParamMap.get('field')
      ? (this.searchTextType = this.route.snapshot.queryParamMap.get('field'))
      : (this.searchTextType = null);

    this.subcategoryId != null ? (this.searchTextType = 'subcategory') : '';

    console.log(this.searchText + ' ' + this.location);

    let payload = {
      searchText: decodeURIComponent(this.searchText),
      searchTextType: this.searchTextType,
    };

    var qryparams = {
      page: this.page - 1,
      size: this.size,
    };

    this._apiSharedService.getBannerByKeyword(payload).subscribe((banner) => {
      if (banner) {
        banner.link = this.keywordDetails.bannerUrl;
        this.image = banner;
      } else {
        this.image = 'na';
      }
    });

    this._apiSharedService
      .searchProducts(
        payload,
        qryparams
        // this.authservice.loggedInUserDetails ? qryparamslog : qryparams
      )
      .subscribe((res) => {
        if (
          (res.body.products && res.body.products.length > 0) ||
          res.body.sponsoredProduct
        ) {
          this.page++;
          this.filters = {
            brandList: res.body.brandList.map((brand) => {
              return { name: brand, checked: false };
            }),
            categories: res.body.categories.map((category) => {
              return { name: category, checked: false };
            }),
            sellerNames: res.body.sellerNames.map((seller) => {
              return { name: seller, checked: false };
            }),
            states: res.body.states.map((state) => {
              return { name: state, checked: false };
            }),
            subCategories: res.body.subCategories.map((subcategory) => {
              return { name: subcategory, checked: false };
            }),
            keywords: res.body.keywords.map((keyword) => {
              return { name: keyword, checked: false };
            }),
          };
          this.storageService.setItem(
            StorageService.SEARCH_FILTERS,
            this.filters
          );
        } else {
          this.filters = this.storageService.getItem(
            StorageService.SEARCH_FILTERS
          );
        }

        for (let i = 0; i < res.body.products.length; i++)
          this.products.push(res.body.products[i]);

        this.sponsoredProduct = res.body.sponsoredProduct;
        this.totalLength = res.headers.get('x-total-count');
        this.homeSearchService.searchResults = null;

        if (
          this.searchTextType == null &&
          this.products &&
          this.products.length > 0
        ) {
          // console.log("post item" + this.searchText);
          this._apiSharedService
            .postBlindKeyword({
              title: this.searchText,
              metaKeywords: [],
              createdDate: new Date(),
              keywordResultCount: this.totalLength,
              status: 'Inactive',
            })
            .subscribe((res) => {
              console.log('res');
            });
        }

        // update keyword count
        if (
          this.searchTextType == 'keyword' &&
          this.products &&
          this.products.length > 0
        ) {
          // console.log("post item" + this.searchText);
          // this._apiSharedService
          //   .updateKeywordResultCount({
          //     id: this.keywordDetails.id,
          //     keywordResultCount: this.totalLength,
          //   })
          //   .subscribe((res) => {
          //     console.log('res');
          //   });
        }
      });
  }

  searchProduct(isFirstLoad, event) {
    let payload = {
      searchText: decodeURIComponent(this.searchText),
      searchTextType: this.searchTextType,
    };

    var qryparams = {
      page: this.page - 1,
      size: this.size,
    };

    this._apiSharedService
      .searchProducts(
        payload,
        qryparams
        // this.authservice.loggedInUserDetails ? qryparamslog : qryparams
      )
      .subscribe((res) => {
        if (isFirstLoad) event.target.complete();
        if (
          (res.body.products && res.body.products.length > 0) ||
          res.body.sponsoredProduct
        ) {
          this.page++;
          this.filters = {
            brandList: res.body.brandList.map((brand) => {
              return { name: brand, checked: false };
            }),
            categories: res.body.categories.map((category) => {
              return { name: category, checked: false };
            }),
            sellerNames: res.body.sellerNames.map((seller) => {
              return { name: seller, checked: false };
            }),
            states: res.body.states.map((state) => {
              return { name: state, checked: false };
            }),
            subCategories: res.body.subCategories.map((subcategory) => {
              return { name: subcategory, checked: false };
            }),
            keywords: res.body.keywords.map((keyword) => {
              return { name: keyword, checked: false };
            }),
          };
          this.storageService.setItem(
            StorageService.SEARCH_FILTERS,
            this.filters
          );
        } else {
          this.filters = this.storageService.getItem(
            StorageService.SEARCH_FILTERS
          );
        }
        //this.products = res.body.products;
        for (let i = 0; i < res.body.products.length; i++)
          this.products.push(res.body.products[i]);

        this.sponsoredProduct = res.body.sponsoredProduct;
        this.totalLength = res.headers.get('x-total-count');
        this.homeSearchService.searchResults = null;
      });
  }

  productDetail(productId) {
    this.router.navigate(['product', productId]);
  }

  sellerUrl(urlString) {
    console.log(urlString);
    window.open(environment.websiteUrl + urlString, '_system');
  }

  doInfinite(event) {
    this.searchProduct(true, event);
  }
}
