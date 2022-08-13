import { Component, Input, OnInit } from '@angular/core';
import { ApiSharedService } from 'src/app/services/api-shared.service';

@Component({
  selector: 'app-yp-img',
  templateUrl: './yp-img.component.html',
  styleUrls: ['./yp-img.component.scss'],
})
export class YpImgComponent implements OnInit {
  @Input() id;
  @Input() height;
  @Input() shimmer;
  @Input() imgHt;
  @Input() prodName;
  imageContent;
  constructor(private _apiSharedService: ApiSharedService) {}

  ngOnInit() {
    if (this.id) {
      this._apiSharedService.getImageContent(this.id).subscribe(
        (res) => {
          if (res.imageContent && res.imageContentContentType) {
            this.imageContent =
              res.imageContentContentType + ',' + res.imageContent;
          } else if (res.imageContent && !res.imageContentContentType) {
            this.imageContent =
              res.imageContentContentType + ',' + res.imageContent;
          } else {
            this.imageContent = 'assets/images/YP-logo@2x.png';
          }
        },
        (error) => {
          this.imageContent = 'assets/images/YP-logo@2x.png';
        }
      );
    } else {
      this.imageContent = 'assets/images/YP-logo@2x.png';
    }
  }
}
