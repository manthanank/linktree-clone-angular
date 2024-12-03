import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data: any;
  name: any;
  href: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('data.json').subscribe((data) => {
      this.data = data;
      this.name = data;
    });
  }

  shareUrl() {
    if (navigator.share) {
      navigator.share({
        title: 'My Awesome App',
        text: 'Check out this awesome Angular app',
        url: window.location.href,
      });
    }
  }

  shareLink(url: any) {
    console.log(url);
    if (navigator.share) {
      navigator.share({
        title: 'Site Link',
        text: 'Check out this link',
        url: url,
      });
    }
  }
}
