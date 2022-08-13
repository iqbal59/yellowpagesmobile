import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSharedService } from 'src/app/services/api-shared.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  popular_categories: any[] = [];
  popular_subcategories: any[] = [];
  all_categories: any[] = [];
  all_subcategories: any[] = [];
  temp_all_categories: any[] = [];
  filterProductSubCategories;
  categoryId;
  categoryName;
  alphabets = [
    'ALL',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  searchKeywordControl = new FormControl('');
  tempAllCategories: any[] = [];
  tempAllSubcategories: any[] = [];
  categorySize = 4;
  constructor(
    private _apiSharedService: ApiSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryid');
    this.categoryName = this.route.snapshot.paramMap.get('categoryname');
    if (this.categoryName) {
      this.categoryName = this.route.snapshot.paramMap
        .get('categoryname')
        .split('-')
        .join(' ');
    }
    if (this.categoryId) {
      this.getAllSubcategories();
    } else {
      this.getPoppularCategories();
      this.getAllCategories();
    }
  }

  filterByAlphabets(alphabet) {
    if (alphabet == 'ALL') {
      this.all_categories = this.temp_all_categories;
    } else {
      this.all_categories = [];
      this.temp_all_categories.forEach((item) => {
        if (item.alphabet == alphabet) {
          this.all_categories.push(item);
        }
      });
    }
  }

  searchField() {
    let text = this.searchKeywordControl.value;
    if (this.categoryId) {
      let temp1 = this.tempAllSubcategories.filter((item1) => {
        return item1.subCategoryName.toLowerCase().includes(text.toLowerCase());
      });
      this.filterCategoriesOrSubcategories(temp1, 'subCategoryName');
    } else {
      let temp1 = this.tempAllCategories.filter((item1) => {
        return item1.categoryName.toLowerCase().includes(text.toLowerCase());
      });
      this.filterCategoriesOrSubcategories(temp1, 'categoryName');
    }
  }

  getPoppularCategories() {
    this._apiSharedService
      .getPopularProductCategories(this.categorySize)
      .subscribe(
        (res) => {
          this.popular_categories = res;
          this.popular_categories = this.popular_categories.filter(
            (obj) =>
              obj.id !== '' && obj.categoryName !== '' && obj.status != 'false'
          );
        },
        (error) => {}
      );
  }

  getPopularSubategories(subcategories) {
    this.popular_subcategories = subcategories;
    this.popular_subcategories = this.popular_subcategories.filter(
      (obj) =>
        obj.id !== '' && obj.subCategoryName !== '' && obj.status != 'false'
    );
    //Sort by
    this.popular_subcategories.sort((a, b) => b.hitCount - a.hitCount);
  }

  getAllCategories() {
    this._apiSharedService
      .getAllProductCategoriesIdName(0, 10000)
      .subscribe((res) => {
        this.tempAllCategories = res;
        this.filterCategoriesOrSubcategories(
          this.tempAllCategories,
          'categoryName'
        );
      });
  }

  getAllSubcategories() {
    this._apiSharedService
      .getCategoryById(this.route.snapshot.paramMap.get('categoryid'), {
        size: 200,
        sort: 'categoryName',
      })
      .subscribe((res) => {
        this.tempAllSubcategories = res.productsSubcategories;
        this.getPopularSubategories(res.productsSubcategories);
        this.filterCategoriesOrSubcategories(
          this.tempAllSubcategories,
          'subCategoryName'
        );
      });
  }

  filterCategoriesOrSubcategories(res, name) {
    this.all_categories = res.filter(
      (obj) =>
        obj.id !== '' && obj[name] && obj[name] !== '' && obj.status != 'false'
    );
    this.all_categories.sort((a, b) =>
      a[name].localeCompare(b[name], 'es', { sensitivity: 'base' })
    );
    let data = this.all_categories.reduce((r, e) => {
      let alphabet = e[name][0];
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] };
      else r[alphabet].record.push(e);
      return r;
    }, {});
    this.all_categories = Object.values(data);
    this.temp_all_categories = this.all_categories;
  }

  getUrl(id, name) {
    if (this.categoryId) {
      // return (
      //   '/subcategory/' +
      //   this.categoryName.toLowerCase().replace(/[ ,]/g, '-') +
      //   '/' +
      //   name.toLowerCase().replace(/[ ,]/g, '-') +
      //   '/' +
      //   id
      // );

      this.router.navigate(['subcategory', name, 'uae', id], {
        queryParams: {},
      });
    } else {
      this.router.navigate(
        ['category', this.categoryName.toLowerCase().replace(/[ ,]/g, '-'), id],
        {
          queryParams: {},
        }
      );
      // return '/category/' + name.toLowerCase().replace(/[ ,]/g, '-') + '/' + id;
    }
  }
}
