import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CATEGORY,
  PRODUCT,
  OFFER,
  BANNER,
  IMAGE,
  BLOG,
  SELLER,
  SEARCH,
  PACKAGES,
  BUYER,
  ENQUIRY,
  LOGIN,
  KEYWORD,
  LEAD,
  USER,
  JOBS,
  BUSINESS,
  DOCUMENTS,
  SALES,
  BLINDKEYWORDS,
} from '../constants/api-constants';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiSharedService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  sellerId;
  constructor(
    private _apiService: ApiService,
    private storageService: StorageService,
    private httpClient: HttpClient
  ) {
    //this.sellerId = this.storageService.getItem(StorageService.USER_ID);
    this.sellerId = '';
  }

  public readFileAsync(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  public getImageContent(id: any): Observable<any> {
    return this._apiService.get(IMAGE.IMAGE + id, false);
  }

  public getPopularCategories(size): Observable<any> {
    return this._apiService.get(
      CATEGORY.FEATURED_CATEGORIES + '?size=' + size,
      false
    );
  }

  public getPopularProducts(size): Observable<any> {
    return this._apiService.get(
      PRODUCT.POPULAR_PRODUCTS + '?size=' + size,
      false
    );
  }

  public getLatestProducts(size): Observable<any> {
    return this._apiService.get(
      PRODUCT.LATEST_PRODUCTS + '?size=' + size,
      false
    );
  }

  public getLatestOffers(page, size): Observable<any> {
    return this._apiService.get(
      OFFER.LATEST_OFFERS + '?page=' + page + '&size=' + size,
      false
    );
  }

  public getBlog(page?, size?): Observable<any> {
    return this._apiService.get(
      BLOG.GUEST + '?page=' + page + '&size=' + size,
      true
    );
  }

  public getBlogByID(id): Observable<any> {
    return this._apiService.get(BLOG.GUEST + '/' + id, false);
  }

  public getBlogByTitle(queryParams): Observable<any> {
    return this._apiService.get(BLOG.GUEST_BY_TITLE, false, queryParams);
  }

  public getAllBlogs(): Observable<any> {
    return this._apiService.get(BLOG.GUEST, false);
  }

  public getFeaturedBlogs(): Observable<any> {
    return this._apiService.get(BLOG.GUEST_FEATURED, false, {
      page: 0,
      size: 6,
    });
  }

  public getAllGuestBanners(): Observable<any> {
    return this._apiService.get(BANNER.GUEST, false);
  }

  public getAllProductCategories(page, size): Observable<any> {
    return this._apiService.get(CATEGORY.GUEST, false, {
      page: page,
      size: size,
    });
  }

  public getAllProductCategoriesIdName(page, size): Observable<any> {
    return this._apiService.get(CATEGORY.MIN, false, {
      page: page,
      size: size,
    });
  }

  public getAllProductCategoriesOnDemand(payload): Observable<any> {
    return this._apiService.post(CATEGORY.ALL_CATEGORIES_ON_DEMAND, payload);
  }

  public getBlogCategories(): Observable<any> {
    return this._apiService.get(BLOG.CATEGORIES, true);
  }

  public getLatestBlog(queryParams): Observable<any> {
    return this._apiService.get(BLOG.GUEST, false, queryParams);
  }

  public getFilterBlog(payload, queryParams): Observable<any> {
    if (payload.productCategoryIds && payload.productCategoryIds.length > 0) {
      queryParams.categoryIds = payload.productCategoryIds.join(',');
    }
    if (payload.selectedLanguage && payload.selectedLanguage.trim() != '') {
      queryParams.language = payload.selectedLanguage.trim();
    }
    if (
      payload.dateFilter &&
      payload.dateFilter.startRange &&
      payload.dateFilter.startRange != ''
    ) {
      queryParams.startDate = payload.dateFilter.startRange;
    }
    if (
      payload.dateFilter &&
      payload.dateFilter.endRange &&
      payload.dateFilter.endRange != ''
    ) {
      queryParams.endDate = payload.dateFilter.endRange;
    }
    return this._apiService.get(BLOG.FILTER, true, queryParams);
  }

  public getAllFeaturedProductCategories(queryparams): Observable<any> {
    return this._apiService.get(
      CATEGORY.FEATURED_PRDUCT_CATEGORIES,
      false,
      queryparams
    );
  }

  public getProductDetails(prodId, userId): Observable<any> {
    let token = this.storageService.getItem(StorageService.USER_ACCESS_TOKEN);
    if (userId && token) {
      return this._apiService.get<any>(
        PRODUCT.PRODUCT + '/' + prodId,
        false,
        { userId: userId },
        true
      );
    } else {
      return this._apiService.get<any>(
        PRODUCT.PRODUCT_GUEST_DETAILS + prodId,
        false,
        null,
        false
      );
    }
  }

  public getPopularProductCategories(size): Observable<any> {
    return this._apiService.get(
      CATEGORY.POPULAR_CATEGORIES + '?size=' + size + '&sort=hitCount,desc',
      false
    );
  }

  public getAllCategories(size, sortby): Observable<any> {
    return this._apiService.get(
      CATEGORY.ALL_CATEGORIES + '?size=' + size + '&sort=' + sortby,
      false
    );
  }

  public getCategoryById(id, queryparams): Observable<any> {
    return this._apiService.get(CATEGORY.GUEST + '/' + id, false, queryparams);
  }

  public getUserByLogin(force?, loginId?): Observable<any> {
    // let cachedLoginDetails = this.storageService.getItem(StorageService.LOGGED_IN_USER_DETAILS);
    // if(cachedLoginDetails && !force) return of(cachedLoginDetails);
    let login = null;
    if (loginId) {
      login = loginId;
    } else {
      login = this.storageService.getItem(StorageService.LOGIN);
    }
    if (login)
      return this._apiService.get(
        SELLER.BY_LOGIN + '/' + login,
        false,
        null,
        true
      );
    else return;
  }

  public getUserStats(): Observable<any> {
    let sellerId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(SELLER.STATS + sellerId, false, null, true);
  }

  public updateSellerData(data): Observable<any> {
    return this._apiService.put(SELLER.PARTIAL_UPDATE, data, false, null, true);
  }

  public getSellerRequirements(size, sort): Observable<any> {
    let sellerId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      SELLER.REQUIRMENTS + sellerId + '?size=' + size + '&sort=' + sort,
      false,
      null,
      true
    );
  }

  public getSellerRequirementsList(sort, page, size): Observable<any> {
    let sellerId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      SELLER.REQUIRMENTS +
        sellerId +
        '?size=' +
        size +
        '&sort=' +
        sort +
        '&page=' +
        page,
      true,
      null,
      true
    );
  }

  public getSellerEnquiriesList(page, size, sort): Observable<any> {
    let sellerId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      SELLER.ENQUIRIES +
        sellerId +
        '?size=' +
        size +
        '&sort=' +
        sort +
        '&page=' +
        page,
      true,
      null,
      true
    );
  }

  public getSellerProductsAllNew(page, size): Observable<any> {
    let sellerId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      SELLER.PRODUCTS_SERVICES + sellerId + '?page=' + page + '&size=' + size,
      false,
      null,
      true
    );
  }

  public getSellerProductsAllNewList(
    page,
    size,
    isFeatured,
    searchText,
    sort
  ): Observable<any> {
    let sellerId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      SELLER.PRODUCTS_SERVICES +
        sellerId +
        '?page=' +
        page +
        '&size=' +
        size +
        (isFeatured ? '&isFeatured=' + isFeatured : '') +
        (searchText ? '&searchText=' + searchText : '') +
        '&sort=' +
        sort,
      true,
      null,
      true
    );
  }

  public addImage(data): Observable<any> {
    return this._apiService.post(
      IMAGE.IMAGE,
      JSON.stringify(data),
      false,
      null,
      true
    );
  }

  public addProduct(data): Observable<any> {
    return this._apiService.post(PRODUCT.PRODUCT, data, true, null, true);
  }

  public getSearchData(searchText): Observable<any> {
    return this._apiService.get(
      SEARCH.BY_SEARCH + '?searchText=' + encodeURIComponent(searchText),
      true,
      null,
      false
    );
  }

  public updateProduct(data): Observable<any> {
    return this._apiService.put(
      PRODUCT.PRODUCT_DETAILS,
      data,
      false,
      null,
      true
    );
  }

  public getPackages(): Observable<any> {
    return this._apiService.get(PACKAGES.SERVICE_PACKAGES, true, null, true);
  }

  public getBuyerEnquiries(queryParams): Observable<any> {
    let userId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      BUYER.ENQUIRIES + userId,
      true,
      queryParams,
      true
    );
  }

  public searchProducts(payload, queryParams): Observable<any> {
    return this._apiService.post(
      SEARCH.PRODUCTS,
      payload,
      true,
      queryParams,
      false
    );
  }

  public searchPackageProducts(payload, queryParams): Observable<any> {
    return this._apiService.post(
      SEARCH.PACKAGE_PRODUCTS,
      payload,
      false,
      queryParams,
      false
    );
  }

  public postEnquiries(fielddata): Observable<any> {
    return this._apiService.post(
      ENQUIRY.COMPANY_ENQUIRY,
      fielddata,
      true,
      null,
      true
    );
  }

  public saveOffers(payload): Observable<any> {
    return this._apiService.post(SELLER.OFFER, payload, true, null, true);
  }

  public getUnits(): Observable<any> {
    return this.httpClient.get('assets/testingJson/Units.json');
  }

  public getCountryCodes(): Observable<any> {
    return this.httpClient.get('assets/testingJson/country_codes_v1.json');
  }

  public postRequirements(fielddata): Observable<any> {
    return this._apiService.post(PRODUCT.ENQUIRE, fielddata, true, null, true);
  }

  public sendOtp(phone, isWhatsapp?): Observable<any> {
    let payload = { phone: phone };
    return this._apiService.post(
      LOGIN.SEND_OTP,
      payload,
      false,
      isWhatsapp ? { type: 'whatsapp' } : null,
      false
    );
  }

  public checkUserExists(login): Observable<any> {
    return this._apiService.get(
      LOGIN.USER_EXISTS + login,
      false,
      null,
      false,
      'text'
    );
  }

  public otpLogin(data): Observable<any> {
    return this._apiService.post(LOGIN.AUTHENTICATE_OTP, data);
  }

  public otpRegister(data): Observable<any> {
    return this._apiService.post(LOGIN.OTP_REGISTER, data);
  }

  public getKeywordByName(keyword): Observable<any> {
    return this._apiService.get(KEYWORD.BY_NAME, false, {
      searchText: keyword,
    });
  }

  public getSubcategoryById(id): Observable<any> {
    return this._apiService.get(SEARCH.SUBCATEGORY_BY_ID + id);
  }

  public sendLoginHistory(payload) {
    return this._apiService.post(LOGIN.HISTORY, payload, false, null, true);
  }

  public postUserData(fielddata): Observable<any> {
    return this._apiService.put(
      SELLER.USER_PARTIAL_UPDATE,
      fielddata,
      false,
      null,
      true
    );
  }

  public changePassword(fielddata): Observable<any> {
    return this._apiService.post(
      USER.CHANGE_PASSWORD,
      fielddata,
      true,
      null,
      true
    );
  }

  public forgotPassword(data): Observable<any> {
    return this._apiService.post(USER.FORGOT_PASSWORD, data, true, null, true);
  }

  public getBuyerRequiments(buyerId, sort, page, size): Observable<any> {
    return this._apiService.get(
      BUYER.REQUIRMENTS +
        buyerId +
        '?sort=' +
        sort +
        '&page=' +
        page +
        '&size=' +
        size,
      true,
      null,
      true
    );
  }

  public getApprovedProductsBySeller(sellerId, queryParams): Observable<any> {
    return this._apiService.get(
      PRODUCT.APPROVED_PRODUCTS_BY_SELLER + sellerId,
      false,
      queryParams
    );
  }

  public getRelatedProductsByProductId(
    productId,
    queryparams
  ): Observable<any> {
    return this._apiService.get(
      PRODUCT.RELATED_PRODUCTS_BY_PRODUCT_ID + productId,
      true,
      queryparams
    );
  }

  public socialLogin(data): Observable<any> {
    return this._apiService.post(LOGIN.AUTHENTICATE_SOCIAL, data);
  }

  public userLogin(data): Observable<any> {
    return this._apiService.post(LOGIN.AUTHENTICATE, data);
  }

  public socialReg(data): Observable<any> {
    return this._apiService.post(LOGIN.REGISTER_SOCIAL, data);
  }

  public searchLeads(payload, queryParams): Observable<any> {
    return this._apiService.post(
      LEAD.BY_SEARCH,
      payload,
      true,
      queryParams,
      true
    );
  }

  public viewLeadDetails(payload): Observable<any> {
    return this._apiService.post(
      LEAD.ADD_ENQUIRY,
      payload,
      false,
      null,
      true,
      'text'
    );
  }

  public registration(payload): Observable<any> {
    return this._apiService.post(
      USER.REGISTER,
      payload,
      false,
      null,
      true,
      'text'
    );
  }

  public getJobList(queryParams): Observable<any> {
    return this._apiService.get(JOBS.JOB_PORTAL, true, queryParams, true, null);
  }

  public addJob(payload): Observable<any> {
    return this._apiService.post(
      JOBS.JOB_PORTAL,
      payload,
      false,
      null,
      true,
      'text'
    );
  }
  public updateJob(fielddata): Observable<any> {
    return this._apiService.put(JOBS.JOB_PORTAL, fielddata, false, null, true);
  }
  public getBannerByPageName(payload): Observable<any> {
    return this._apiService.get(
      BANNER.GET_BANNER_BY_PAGE_NAME,
      false,
      { webPageNames: payload },
      false
    );
  }

  public getBannerByKeyword(payload): Observable<any> {
    return this._apiService.post(BANNER.BANNER_BY_KEYWORD, payload);
  }

  public getSellerByCompanyName(companyName): Observable<any> {
    return this._apiService.get(SELLER.BY_COMPANY_NAME + companyName);
  }

  public getTempSeller(): Observable<any> {
    let userId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(SELLER.TEMP_SELLER + userId, false, null, true);
  }

  public getFeaturedProductsBySeller(sellerId): Observable<any> {
    return this._apiService.get(PRODUCT.FEATURED_PRODUCTS_BY_SELLER + sellerId);
  }

  public getJobDetails(id): Observable<any> {
    return this._apiService.get(
      JOBS.GUEST_JOB_PORTAL + '/' + id,
      false,
      null,
      true,
      null
    );
  }

  public filterJobs(payload, queryParams): Observable<any> {
    if (payload.jobCategories && payload.jobCategories.length > 0) {
      queryParams.categoryIds = payload.jobCategories.join(',');
    }
    if (payload.searchText && payload.searchText.trim() != '') {
      queryParams.searchText = payload.searchText.trim();
    }
    return this._apiService.get(JOBS.FILTER_JOB, true, queryParams);
  }

  public claimBusiness(payload): Observable<any> {
    return this._apiService.post(
      BUSINESS.CLAIM,
      payload,
      false,
      null,
      false,
      null
    );
  }

  public applyJobs(payload): Observable<any> {
    return this._apiService.post(JOBS.APPLY_JOB, payload, true, null, true);
  }

  public getSellerJobs(id, queryParams): Observable<any> {
    return this._apiService.get(
      JOBS.SELLER_JOB + '/' + id,
      true,
      queryParams,
      true,
      null
    );
  }

  public getBuyerJobs(queryParams): Observable<any> {
    let userId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.get(
      JOBS.BUYER_JOB + '/' + userId,
      true,
      queryParams,
      true,
      null
    );
  }

  public addDocument(payload): Observable<any> {
    return this._apiService.post(DOCUMENTS.ADD, payload, false, null, true);
  }

  public getBrowsingHistory(id, queryParams): Observable<any> {
    return this._apiService.get(
      LOGIN.BROWSING_HISTORY + '/' + id,
      true,
      queryParams,
      true,
      null
    );
  }

  public getProductHistory(id, queryParams): Observable<any> {
    return this._apiService.get(
      LOGIN.PRODUCT_HISTORY + '/' + id,
      true,
      queryParams,
      true,
      null
    );
  }

  public createPaymentTransaction(packageId, data): Observable<any> {
    let userId = this.storageService.getItem(StorageService.USER_ID);
    return this._apiService.post(
      'api/create-payment-transaction/' + userId + '?packageId=' + packageId,
      JSON.stringify(data),
      false,
      null,
      true
    );
  }

  public getPackagesById(id): Observable<any> {
    return this._apiService.get(
      PACKAGES.SERVICE_PACKAGES + '/' + id,
      false,
      null,
      true
    );
  }
  public getJobApplicantsByJobId(id, payload, queryParams): Observable<any> {
    return this._apiService.post(
      JOBS.JOB_APPLICANTS_BY_JOBID + '/' + id,
      payload,
      true,
      queryParams,
      true,
      null
    );
  }

  public getSalesOrderBySeller(): Observable<any> {
    let userId = this.storageService.getItem('userId');
    return this._apiService.get(
      SALES.ORDER + '/' + userId,
      false,
      null,
      true,
      null
    );
  }

  public getJobCategory(queryParams): Observable<any> {
    return this._apiService.get(
      JOBS.JOB_CATEGORIES,
      false,
      queryParams,
      true,
      null
    );
  }

  public deleteJob(id): Observable<any> {
    return this._apiService.delete(
      JOBS.JOB_PORTAL + '/' + id,
      false,
      null,
      true
    );
  }

  public getDocumentConent(id): Observable<any> {
    return this._apiService.get(
      DOCUMENTS.ADD + '/' + id,
      false,
      false,
      true,
      null
    );
  }

  public verifyEmail(key): Observable<any> {
    return this._apiService.get(
      USER.EMAIL_VERIFICATION,
      false,
      { key: key },
      true,
      null
    );
  }

  public postBlindKeyword(fielddata): Observable<any> {
    return this._apiService.post(
      BLINDKEYWORDS.BLIND_KEYWORD,
      fielddata,
      true,
      null,
      true
    );
  }

  public getBlindKeywordByName(keyword): Observable<any> {
    return this._apiService.get(BLINDKEYWORDS.BY_NAME, false, {
      searchText: keyword,
    });
  }

  public updateKeywordResultCount(fielddata): Observable<any> {
    return this._apiService.put(
      KEYWORD.UPDATE_KEYWORD,
      fielddata,
      true,
      null,
      true
    );
  }

  public increaseBannerCount(id): Observable<any> {
    return this._apiService
      .get('api/guest/banners-set-click-count/' + id, false)
      .pipe();
  }

  public increaseOfferCount(id): Observable<any> {
    return this._apiService
      .get('api/guest/offers-set-click-count/' + id, false)
      .pipe();
  }
}
