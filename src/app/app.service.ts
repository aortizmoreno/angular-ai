import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url: string = 'http://localhost:3000'; //modify with the correct url aws api gateway

  constructor(private http: HttpClient) { }

  sendImage(base64Image: String | null): Observable<any>{
    const jsonImage = { image: base64Image};
    // return this.http.post(this.url, jsonImage); //modify with the correct path
    const json: any = {
      description: 'It is a fruit',
      labels: ["Apple", "Banana", "Orange"],
    };

    return of(json);
  }
}
