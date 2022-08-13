import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { YpImgComponent } from 'src/app/components/yp-img/yp-img.component';
import { RequirementSmallComponent } from 'src/app/components/requirement-small/requirement-small.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductPageRoutingModule,
  ],
  declarations: [ProductPage, YpImgComponent, RequirementSmallComponent],
})
export class ProductPageModule {}
