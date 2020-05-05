import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent implements OnInit {

  inBasket: number

  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

  /* Redirecting to basket page */
  shoppingBasketClick() {
    this.router.navigateByUrl("/basket");
  }

  /* Redirecting to home page */
  logoClick() {
    this.router.navigateByUrl("/home");
  }

  /* Generating number of items user holds in basket every half second */
  watch() {
    setInterval(() => {
      var actualCookie = this.cookie.get("basket");

      if (actualCookie != "")
        this.inBasket = actualCookie.split(";").length;
      else
        this.inBasket = 0;
    }, 500);
  }

  ngOnInit(): void {
    this.watch();
  }

}
