import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  socialurl(type: any) {
    switch (type) {
      case 'facebook':
        window.open('https://www.facebook.com/UAEYellowPages', '_system');
        break;
      case 'twitter':
        window.open('https://twitter.com/etisalatyp', '_system');
        break;
      case 'pinterest':
        window.open('https://www.pinterest.com/yellowpages_ae/', '_system');
        break;
      case 'instagram':
        window.open(
          'https://www.instagram.com/etisalatyellowpages/',
          '_system'
        );
        break;
      case 'linkedin':
        window.open(
          'https://www.linkedin.com/company/etisalat-yellow-pages',
          '_system'
        );
        break;
      case 'vimeo':
        window.open('https://vimeo.com/etisalatyellowpagesuae/', '_system');
        break;
    }
  }
}
