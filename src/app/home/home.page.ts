import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Myservice} from "../myservice";
import {Router} from "@angular/router";
import {query} from "@angular/animations";

@Component({
  selector: 'app-home',
  //templateUrl: 'home.page.html',
  template: `
    <ion-content>

      <ion-item>
        <ion-button (click)="router.navigate(['/home/create'])">Create New Article</ion-button>
      </ion-item>

      <ion-input [(ngModel)]="SearchValue">
        <ion-button (click)="Search()">Search.🪄</ion-button>
      </ion-input>

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
  myVariable = new FormControl('',[Validators.required, Validators.pattern('(?:Bob|Rob|Dob|Lob)')]);

  SearchValue: string = "";

  myFormGroup = new FormGroup({
    title: this.myVariable,

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

  async Search() {
    console.log(this.SearchValue)

    if (this.SearchValue.length == 0) {
      this.getData()
      return
    }

    const url = "http://localhost:5000/api/articles/";

    const call = this.http.get<feedItem[]>(url, {params: {searchTerm: this.SearchValue, pageSize:20}});
    const result = await firstValueFrom<feedItem[]>(call);
    this.service.feed = result;
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
