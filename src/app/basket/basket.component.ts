import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { ProductsapiService } from "../productsapi.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  products
  finalprice: string

  constructor(
  	private cookie: CookieService,
    private productsApi: ProductsapiService,
    private router: Router
  ) { }

  /*
    Determiting which of three buttons was pressed in basket page
    0 --- Continue Shopping > it redirects navigation on Home Page
    1 --- Clear Basket > it removes all cookies and generates new list by calling makeBasket()
    2 --- Checkout > Obviously doesnt work on this site :)
  */
  clickButton(index) {
  	switch (index) {
  		case 0:
    		this.router.navigateByUrl("/home");
  			break;

  		case 1:
  			this.cookie.set("basket", "");
  			this.makeBasket();
  			break;

  		case 2:
  			alert("Checkout is not comming soon.");
  			break;
  	}
  }

  /*
    Removing single item from cookies by ForEaching through all of items in cookies and matching name of item
    we want to delete and name from cookies, then skip that one item from writing it into new cookies, after
    all we call method makeBasket()
  */
  removeItem(name) {
  	var c = this.cookie.get("basket").split(";");
  	var newcookie = "";
  	var removed = false;

  	c.forEach(item => {
		if (item != name)
			if (newcookie === "")
        newcookie += item + "";
			else
        newcookie += ";" + item;
		else if (!removed)
      removed = true;
		else
			if (newcookie === "")
        newcookie += item + "";
			else
        newcookie += ";" + item;

  	});

  	this.cookie.set("basket", newcookie);

  	this.makeBasket();
  }

  /*
    Getting all cookies and also getting all products from API and generating into var:out prices & names of products,
    calculating final price in out.forEach(); and in this.finalprice putting dots into long numbers
  */
  async makeBasket() {
  	var c = this.cookie.get("basket").split(";");
  	var p = this.productsApi.getHomeProducts();
  	var out = [];

  	var price = 0;

  	c.forEach(name => {
  		p.forEach(match => {
  			if (name === match[0]) out.push(match);
  		});
  	});

  	out.forEach(item => {
  		price += parseInt(item[1].split(" ")[0].includes(".") ? item[1].split(" ")[0].replace(".", "") : item[1].split(" ")[0]);
  	});

  	this.finalprice = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  	this.products = out;
  }

  ngOnInit(): void {
  	this.makeBasket();
  }

}
