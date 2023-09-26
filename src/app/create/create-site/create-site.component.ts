import { Component, OnInit } from '@angular/core';
import {print} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-site',
  //templateUrl: './create-site.component.html',
  template: `
    <div style="height: 80%; width: 100%;">
    <ion-content>

      <h1>add Name on article</h1>
      <ion-input [(ngModel)]="title"></ion-input>

      <h1>add Name of Author</h1>
      <ion-input [(ngModel)]="author"></ion-input>

      <h1>add the article content</h1>
      <ion-input [(ngModel)]="content"></ion-input>

      <h1>add an image url</h1>
      <ion-input [(ngModel)]="imgURL"></ion-input>

      <ion-button (click)="addArticleDB()">Confirm</ion-button>

    </ion-content>
    </div>
  `,
  styleUrls: ['./create-site.component.scss'],
})
export class CreateSiteComponent  implements OnInit {
  title: string = "";
  author: string = "";
  content: string = "";
  imgURL: string = "";

  constructor(public router: Router) { }

  ngOnInit() {}

  addArticle() {
    console.log(this.title.toString());
    console.log(this.author.toString());
    console.log(this.content.toString());
    console.log(this.imgURL.toString());
  }

  async addArticleDB(){
    const headers = {'Content-Type': 'application/json'};

    const url = "http://localhost:5000/api/articles";
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({articleId: -1,
        headline: this.title,
        body: this.content,
        author: this.author,
        articleImgUrl: this.imgURL})
    };

    try {
      const httpResponse = await fetch(url, options);
      const json = await httpResponse.json();
      console.log(json)

      this.router.navigate(['/home/create'])
    } catch (e) {
      console.log(e)
    }
  }
}
