import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SEARCH } from 'src/app/constants/api-constants';
import { ApiService } from 'src/app/services/api.service';
import { HomeSearchService } from 'src/app/services/home-search.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss'],
})
export class SearchHomeComponent implements OnInit {
  terms: string;
  isSearch: boolean;
  location: string;
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
  constructor(
    private modalCtrl: ModalController,
    private _apiService: ApiService,
    private homeSearchService: HomeSearchService,
    private router: Router
  ) {
    this.isSearch = true;
    this.location = 'UAE';
  }

  closeSearch() {
    this.modalCtrl.dismiss({ dismissed: true });
  }

  getSearch(event: any) {
    console.log(event.detail.value);
    if (this.isSearch) this.autoCompleteSearch(event.detail.value);
  }

  autoCompleteSearch(searchText) {
    if (
      searchText &&
      searchText.trim() != '' &&
      searchText.trim().length > 1 &&
      searchText.length > 2
    ) {
      this._apiService
        .get(
          SEARCH.BY_SEARCH + '?searchText=' + encodeURIComponent(searchText),
          true,
          null,
          false
        )
        .subscribe((res: any) => {
          this.homeSearchService.searchResults = res.body;
          this.homeSearchService.searchResults['keywords'] =
            this.homeSearchService.searchResults['keywords'].map(
              (keyword) => (keyword = keyword.toLowerCase())
            );
          this.homeSearchService.searchResults['productNames'] =
            this.homeSearchService.searchResults['productNames'].map(
              (prod) => ({
                id: prod.id,
                productName: prod.productName.toLowerCase(),
              })
            );
          this.homeSearchService.searchResults['sellerNames'] =
            this.homeSearchService.searchResults['sellerNames'].map(
              (seller) => (seller = seller.toLowerCase())
            );
          this.homeSearchService.searchResults['subCatNames'] =
            this.homeSearchService.searchResults['subCatNames'].map(
              (subcat) => ({
                id: subcat.productSubCategory
                  ? subcat.productSubCategory.id
                  : subcat.id,
                categoryName: subcat.categoryName.toLowerCase(),
                subCategoryName: subcat.subCategoryName.toLowerCase(),
              })
            );
        });
    } else {
    }
  }
  ngOnInit() {}

  selectSearchItem(item: string) {
    this.terms = item;
    console.log(this.terms);
  }

  onSelectSearchText(fieldName, fieldDetails) {
    this.homeSearchService.fieldName = fieldName;
    this.homeSearchService.searchResults = null;
    if (fieldName == 'product') {
      this.terms = fieldDetails.productName;
      this.homeSearchService.fieldDetails = fieldDetails;
      this.homeSearchService.searchText = fieldDetails.productName;
    } else if (fieldName == 'subcategory') {
      this.terms = fieldDetails.subCategoryName;
      this.homeSearchService.fieldDetails = fieldDetails;
      this.homeSearchService.searchText = fieldDetails.subCategoryName;
    } else {
      if (fieldDetails) {
        this.terms = fieldDetails.trim();
        this.homeSearchService.searchText = fieldDetails.trim();
      }
    }
    //  this.onClickSearch();
    this.isSearch = false;
  }

  onClickSearch() {
    this.closeSearch();
    let searchText = this.terms;

    // this.router.navigate(['search']);

    if (this.homeSearchService.fieldName == 'subcategory') {
      this.router.navigate(
        [
          'subcategory',
          // this.homeSearchService.fieldDetails.categoryName
          //   .trim()
          //   .toLowerCase()
          //   .replace(/[ ,]/g, '-'),
          // this.homeSearchService.fieldDetails.subCategoryName
          //   .trim()
          //   .toLowerCase()
          //   .replace(/[ ,]/g, '-'),
          searchText,
          this.location.trim().toLowerCase().replace(/ /g, '-'),
          this.homeSearchService.fieldDetails.id,
        ],
        {
          queryParams: {},
        }
      );
    } else {
      this.router.navigate(
        [
          'search',
          searchText,
          this.location.trim().toLowerCase().replace(/ /g, '-'),
        ],
        {
          queryParams: this.homeSearchService.fieldName
            ? { field: this.homeSearchService.fieldName }
            : {},
        }
      );
    }
  }
  setIsSearch() {
    this.isSearch = true;
  }
  searchClear() {
    this.homeSearchService.fieldName = null;
    this.homeSearchService.searchResults = null;
    this.terms = '';
  }
}
