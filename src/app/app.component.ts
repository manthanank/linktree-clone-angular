import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'linktree-clone-angular';

  data: any;
  name: any;
  href: any;
  // public href: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('/assets/data.json').subscribe(data => {
      this.data = data;
      this.name = data;
      // console.log(this.data);
    });
  }

  shareUrl() {
    if (navigator.share) {
      navigator.share({
        title: 'My Angular App',
        text: 'Check out this awesome Angular app',
        url: window.location.href
      });
    }
  }

  shareLink(url: any) {
    console.log(url);
    if (navigator.share) {
      navigator.share({
        title: 'Site Link',
        text: 'Check out this link',
        url: url
      });
    }
  }
}
