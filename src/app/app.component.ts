import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    {
      title: 'Post Your Requirements',
      url: '/post-requirement',
      icon: 'create',
    },
    { title: 'About Us', url: '/about-us', icon: 'business' },
    { title: 'Mission Statement', url: '/mission-statement', icon: 'podium' },
    { title: 'Privacy Policy', url: '/privacy-policy', icon: 'information' },
    { title: 'Terms & Conditions', url: '/terms', icon: 'reader' },
    // { title: 'Leads', url: '/leads', icon: 'trending-up' },
    //{ title: 'Blogs', url: '/blogs', icon: 'grid' },
    { title: 'Social Media Links', url: '/social', icon: 'link' },
    { title: 'Contact Us', url: '/contact-us', icon: 'headset' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
