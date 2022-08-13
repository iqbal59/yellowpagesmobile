import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeSearchService {
  searchBarVisibleOnHomepage = true;
  searchText;
  fieldName;
  fieldDetails;
  searchResults;
  location;
  constructor() {}
}
