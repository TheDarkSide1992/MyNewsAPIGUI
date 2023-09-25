import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Myservice} from "../myservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  //templateUrl: 'home.page.html',
  template: `
    <ion-content>

      <ion-item>
        <ion-button (click)="router.navigate(['/home/create'])">Create New Article</ion-button>
      </ion-item>


      <ion-card *ngFor="let feedItem of service.feed" (click)="deleteItem(feedItem)">
        <ion-toolbar>
          <ion-title>{{feedItem.headline}}</ion-title>
        </ion-toolbar>
        <comp></comp>
      </ion-card>

    </ion-content>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myVaiable = new FormControl('',[Validators.required, Validators.pattern('(?:Bob|Rob|Dob|Lob)')]);

  url = "http://localhost:5000";

  myFormGroup = new FormGroup({
    title: this.myVaiable,

  })


  constructor(private http: HttpClient,public router: Router, public service: Myservice) {
    this.getData();
  }


  async getData() {
    const call = this.http.get<feedItem[]>('http://localhost:5000/api/feed', {params: {limit: 20}});
    const result = await firstValueFrom<feedItem[]>(call);
    this.service.feed = result;
  }

  async deleteItem(item: feedItem) {
    //pretend we're sending a delete request
    console.log("delleting item" + item.articleId);

    const url = "http://localhost:5000/api/articles/"+item.articleId;
    const options = {
      method: 'DELETE',
    };

    try {
      const httpResponse = await fetch(url, options);
      const json = await httpResponse.json();
      console.log(json)


      this.service.feed = this.service.feed.filter(removething);
      function removething(prod: feedItem) {
        return prod.articleId != item.articleId;
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export interface article {
  articleId : number
  headLine : string
  body : string
  author : string
  articleImgUrl : string
}

export interface feedItem {
  headline : string
  articleId : number
  articleIMGUrl : string
  body: string
}

export interface searchArticleItem{
  headline : string
  articleId : number
  author : string
}

@Component({
  template: `
    <ion-card-content>
      <ion-card-subtitle>dsifdsufpidosfu</ion-card-subtitle>
    </ion-card-content>
  `,
  selector: 'comp'
})
export class MyNewComponent {

}
