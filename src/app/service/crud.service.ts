import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Sequence {
  _id!: String;
  num1!: Number;
  num2!: Number;
  num3!: Number;
  num4!: Number;
  numX!: Number;
  numY!: Number;
  numZ!: Number;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:3000/api';

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Create
  CreateSequence(data: Sequence): Observable<any> {
    let API_URL = `${this.REST_API}/create-sequence`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetSequences() {
    let API_URL = `${this.REST_API}`;
    return this.httpClient.get(API_URL)
  }

  // Get single object
  GetSequence(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/edit-sequence/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  // Update
  updateSequence(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-sequence/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteSequence(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-sequence/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
