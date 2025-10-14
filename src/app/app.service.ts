import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url: string = 'http://localhost:3000'; //modify with the correct url aws api gateway

   constructor(private http: HttpClient) { }

   sendImage(image: String | null): Observable<any>{
    // return this.http.post(`${this.url}/image`, {}); //modify with the correct path
      return of("this is a test response");
   }
}
