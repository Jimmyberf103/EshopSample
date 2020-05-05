import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsapiService {

  /*
	This is fake api call just for get product into page from backend
  */

  //fake products from fake API.
  products = [
  	["Sunglasses of Pride", "3.600 CZK", "Lorem ipsum dor sit amet", "url"],
  	["One of my king", "750 CZK", "Lorem ipsum dor sit amet", "url"],
  	["Get it done", "1.250 CZK", "Lorem ipsum dor sit amet", "url"]
  ]

  constructor() { }

  getHomeProducts() {
  	return this.products;
  }
}
