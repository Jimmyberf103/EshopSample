import { Component, OnInit } from '@angular/core';
import { QuoteapiService } from "../quoteapi.service";
import { ProductsapiService } from "../productsapi.service";

import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  quote: string
  products
  newsletterEmail: string
  validity

  constructor(
    private quoteApi: QuoteapiService,
    private productsApi: ProductsapiService,
    private cookie: CookieService,
    private router: Router
  ) { }

  /* Adding new item into cookies by just pushing piece of string into it */
  addToBasket(name) {
    if (this.cookie.get("basket"))
      this.cookie.set("basket", this.cookie.get("basket") + ";" + name);
    else
      this.cookie.set("basket", name);
  }

  /* calls addToBasket() and then redirects into basket page */
  buyNow(name) {
    this.addToBasket(name);
    this.router.navigateByUrl("/basket");
  }

  /* This is firing up every time the user changes email address and it cheching validity of email address */
  emailChange() {
    if (this.newsletterEmail === "")
      this.validity = true;
    else
      this.validity = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.newsletterEmail);
  }

  /* This have to be some kind of sending email address into server database */
  newsletterClick() {
    //
  }

  /* After clicking on button "SHOP NOW" on first view on page this will scroll down to products */
  moveToProducts() {
    document.getElementById("product-hash").scrollIntoView({behavior: 'smooth'});
  }

  /* Getting quote from API */
  generateQuote() {
    this.quoteApi.getQuote().subscribe(data => {
      this.quote = data["quote"] + "";
    });
  }

  getProducts() {
    //Fake "API" just for simulate getting products from backend
    this.products = this.productsApi.getHomeProducts();
  }

  ngOnInit(): void {
    this.generateQuote();
    this.getProducts();
  }

}
