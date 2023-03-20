import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'linktree-clone-angular';

  data: any;
  name: any;
  href: any;
  // public href: string = "";

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit() {
    this.http.get('/assets/data.json').subscribe(data => {
      this.data = data;
      this.name = data;
      console.log(this.data);
    });
  }

  shareUrl(){
    if (navigator.share) {
      navigator.share({
        title: 'My Angular App',
        text: 'Check out this awesome Angular app',
        url: window.location.href
      });
    }
  }

  shareLink(url:any){
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
