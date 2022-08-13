import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(private router: Router) {}

  getProductUrl(pname, pid) {
    return this.router
      .createUrlTree([
        'product',
        pname.trim().toLowerCase().replace(/ /g, '-'),
        pid,
      ])
      .toString();
  }

  getCategoryUrl(name, id) {
    return this.router
      .createUrlTree([
        'category',
        name.trim().toLowerCase().replace(/ /g, '-'),
        id,
      ])
      .toString();
  }

  getSubcategoryUrl(category, subcategory, id) {
    return category
      ? this.router
          .createUrlTree([
            'subcategory',
            category.trim().toLowerCase().replace(/ /g, '-'),
            subcategory.trim().toLowerCase().replace(/ /g, '-'),
            id,
          ])
          .toString()
      : '/';
  }

  getSellerUrl(sellerCompanyName) {
    return this.router
      .createUrlTree([
        'sellers',
        sellerCompanyName.trim().toLowerCase().replace(/ /g, '-'),
      ])
      .toString();
  }

  getBlogUrl(title) {
    return this.router
      .createUrlTree(['blog', title.toLowerCase().split(' ').join('-')])
      .toString();
  }

  getProductToWhatsapp(prodName, id, seller) {
    let sellermobile;
    let appendUrl = '';
    if (seller.sellerWhatsappNumber1) {
      sellermobile = seller.sellerWhatsappNumber1;
    }
    if (seller.sellerWhatsappNumber1 && seller.sellerWhatsappNumber2) {
      sellermobile =
        seller.sellerWhatsappNumber1 + ',' + seller.sellerWhatsappNumber2;
    } else if (seller.sellerWhatsappNumber1) {
      sellermobile = seller.sellerWhatsappNumber1;
    } else if (seller.sellerWhatsappNumber2) {
      sellermobile = seller.sellerWhatsappNumber2;
    }

    if (sellermobile) {
      appendUrl = sellermobile ? '?id=' + window.btoa(sellermobile) : '';
    }
    return (
      'https://api.whatsapp.com/send?phone=97143440014&text=I am interested in ' +
      encodeURIComponent(prodName) +
      '. https://www.yellowpages.ae/product/' +
      encodeURIComponent(prodName.trim().replace(/ /g, '-')) +
      '/' +
      id +
      appendUrl
    );
  }

  navigateToProductUrl(pname, pid) {
    this.router.navigate([
      '/product',
      pname.trim().toLowerCase().replace(/ /g, '-'),
      pid,
    ]);
  }
}
