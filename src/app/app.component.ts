import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {home} from "ionicons/icons";

@Component({
  selector: 'app-root',
  //templateUrl: 'app.component.html',
  template: `
      <main>
          <ion-header>
              <section (click)="router.navigate(['/home'])" style="background-color: #0d0d0d">
                  <img src="./../assets/icon/favicon.png" alt="logo" aria-hidden="true">
                  <h1>THe Epic NEWS Page</h1>
              </section>
          </ion-header>
          <body>
          <ion-router-outlet></ion-router-outlet>
          </body>
      </main>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {}

  protected readonly home = home;
}
