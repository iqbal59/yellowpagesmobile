import { Injectable } from '@angular/core';
import { ApiSharedService } from './api-shared.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private _apiSharedService: ApiSharedService) {}

  getImageContent(image) {
    if (image && image.id && !image.imageContent) {
      this._apiSharedService.getImageContent(image.id).subscribe(
        (res) => {
          if (res.imageContentContentType && res.imageContent) {
            image['imageContent'] =
              res.imageContentContentType + ',' + res.imageContent;
          } else if (!res.imageContentContentType && res.imageContent) {
            image['imageContent'] = 'data:image/png;base64,' + res.imageContent;
          } else {
            image['imageContent'] = null;
          }
        },
        (error) => {}
      );
    } else if (image.imageContent) {
      if (
        image.imageContentContentType &&
        image.imageContent &&
        !image.imageContent.includes('base64')
      ) {
        image['imageContent'] =
          image.imageContentContentType + ',' + image.imageContent;
      } else if (
        !image.imageContentContentType &&
        image.imageContent &&
        !image.imageContent.includes('base64')
      ) {
        image['imageContent'] = 'data:image/png;base64,' + image.imageContent;
      }
    }
  }
}
