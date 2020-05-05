import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteapiService {

  constructor(
    private http: HttpClient
  ) { }

  getQuote() {
    return this.http.get("https://api.kanye.rest/");
  }
}
