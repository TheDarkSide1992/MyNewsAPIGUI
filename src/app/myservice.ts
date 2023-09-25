import {Injectable} from "@angular/core";
import {feedItem} from "./home/home.page";

@Injectable({
  providedIn: 'root'
})
export class Myservice {
  feed: feedItem[] = [];
}
