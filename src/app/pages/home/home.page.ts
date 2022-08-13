import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { SearchHomeComponent } from 'src/app/components/search-home/search-home.component';
import { ApiSharedService } from 'src/app/services/api-shared.service';
import { BannerService } from 'src/app/services/banner.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { ImageService } from 'src/app/services/image.service';
import { UrlService } from 'src/app/services/url.service';
import { environment } from 'src/environments/environment';
declare var inmSdk: any;
declare var googletag: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('sliderHome', { static: false }) slider: IonSlides;

  blogs: any[] = [];
  slideOpts = {
    slidesPerView: 1.5,
    autoplay: true,
  };

  slideOpts1 = {
    slidesPerView: 1,
    autoplay: true,
  };
  isLoading = true;
  areas = [
    'UAE',
    'Dubai',
    'Sharjah',
    //"Al Ain",
    'Ras Al Khaimah',
    'Abu Dhabi',
    'Ajman',
    'Fujairah',
    'Umm Al Quwain',
  ];

  popular: any;
  category: any;
  latest_offers: any[] = [];
  latest_products: any[] = [];
  productSize = '4';
  categoriesPage = '0';
  categoriesSize = '10';
  popularCategoriesSize = '4';
  popular_categories: any[] = [];
  popular_products: any[] = [];

  constructor(
    private modalController: ModalController,
    private _apiSharedService: ApiSharedService,
    private imageService: ImageService,
    public homepageV2Service: HomepageService,
    public bannerService: BannerService,
    private urlService: UrlService,
    private router: Router
  ) {}

  async openSearch() {
    const modal = await this.modalController.create({
      component: SearchHomeComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
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

    this.getAllBlogs();
    // this.homepageV2Service.getAllBannerByPageName('');
    this.homepageV2Service.getAllBannerByPageName(
      'Header Right,Header Middle,Header Left,Header, Blog Left'
    );
    this.getPopularProduct();
    this.getPopularCategories();
    this.getLatestOffers();
    this.getLatestProduct();
  }

  doRefresh(event) {
    googletag.destroySlots();
    const isConSentGiven = true;
    inmSdk.init(
      'etisalatYellowPages',
      'b7b6437171364a1e866a7e8fc8e4bb6b',
      'ypHP',
      isConSentGiven
    );
    this.getAllBlogs();
    this.homepageV2Service.getAllBannerByPageName('Blog Left');
    this.getPopularProduct();
    this.getPopularCategories();
    this.getLatestOffers();
    this.getLatestProduct();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getAllBlogs() {
    this._apiSharedService.getFeaturedBlogs().subscribe(
      (res) => {
        this.isLoading = false;
        this.blogs = res;
        this.blogs = this.blogs.filter((object) => {
          return object.image && object.image != null;
        });
        this.blogs.forEach((element) => {
          this.imageService.getImageContent(element.image);
        });
        this.blogs.sort(() => Math.random() - 0.5);
      },
      (error) => {}
    );
  }

  blogDetail(title) {
    let url = this.urlService.getBlogUrl(title);
    console.log(url);
    window.open(environment.websiteUrl + url, '_system');
  }

  searchArea(areaName) {
    //console.log(areaName);
    this.router.navigate(
      ['search', 'location', areaName.toLowerCase().replace(/ /g, '-')]
      // ,
      // {
      //   queryParams: { field: 'keyword' },
      // }
    );
  }

  getLatestOffers() {
    this._apiSharedService
      .getLatestOffers(this.categoriesPage, this.categoriesSize)
      .subscribe((data) => {
        this.latest_offers = data;
        this.latest_offers = this.latest_offers.filter((object) => {
          return (
            new Date(object['offerEndDate']) > new Date() &&
            new Date(object['offerStartDate']) < new Date()
          );
        });

        console.log(this.latest_offers);
        this.latest_offers.forEach((element) => {
          this.imageService.getImageContent(element.image);
        });
      });
  }

  getLatestProduct() {
    this._apiSharedService.getLatestProducts(this.productSize).subscribe(
      (data) => {
        this.latest_products = data.products;
        this.latest_products.forEach((element) => {
          if (element.images[0]) {
            this.imageService.getImageContent(element.images[0]);
          } else {
            this.latest_products.push(element);
          }
        });
      },
      (error) => {}
    );
  }

  productDetail(id) {
    console.log(id);
    this.router.navigate(['product', id]);
  }

  goCategory(catname, id) {
    console.log(id);
    this.router.navigate([
      'category',
      catname.toLowerCase().replace(/ /g, '-'),
      id,
    ]);
  }
  getPopularCategories() {
    this._apiSharedService
      .getPopularProductCategories(this.popularCategoriesSize)
      .subscribe(
        (res) => {
          this.popular_categories = res;
          this.popular_categories = this.popular_categories.filter(
            (obj) =>
              obj['id'] !== '' &&
              obj['categoryName'] !== '' &&
              obj['status'] != 'false'
          );
          this.popular_categories.forEach((element) => {
            this.imageService.getImageContent(element.image);
          });
        },
        (error) => {}
      );
  }

  getPopularProduct() {
    this._apiSharedService.getPopularProducts(this.productSize).subscribe(
      (res) => {
        this.popular_products = res.products;
        this.popular_products.forEach((element) => {
          if (element.images[0]) {
            this.imageService.getImageContent(element.images[0]);
          }
        });
      },
      (error) => {}
    );
  }
}
