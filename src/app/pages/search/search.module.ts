import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { YpImgComponent } from 'src/app/components/yp-img/yp-img.component';
import { ProductAdvComponent } from 'src/app/components/product-adv/product-adv.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SearchPageRoutingModule],
  declarations: [SearchPage, YpImgComponent, ProductAdvComponent],
})
export class SearchPageModule {}
