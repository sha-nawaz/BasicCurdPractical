import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:3000/employeList";

  constructor(private httpclint: HttpClient) { }
  
  postEmployeService(data) {
    return this.httpclint.post(this.baseUrl, data)
  };

  getEmployeService() {
    return this.httpclint.get<any>(this.baseUrl)
  };

  updateEmployeService(body, id) {
    return this.httpclint.put<any>(`${this.baseUrl}/${id}`, body)
  };

  delteEmployeService(id) {
    return this.httpclint.delete(`${this.baseUrl}/${id}`)
  };

}
