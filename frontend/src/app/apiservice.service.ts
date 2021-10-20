import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }
  
  //Connect Front end and backend

  apiUrl = 'http://localhost:3000/user';

  //Get all datas

  getAllData():Observable<any>{
      return this._http.get(`${this.apiUrl}`);
  }

  //CREATE DATA
  createData(data: any):Observable<any>{

    console.log(data, 'create data with api')
      return this._http.post(`${this.apiUrl}`, data);
  }
  
}
