import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {
baseUrl ='localhost:8080/api/'
  constructor(private httpClient:HttpClient) { }

  getEmployees():Observable<any>{
    return this.httpClient.get(this.baseUrl + 'employeeList')
  }

  saveEmployee(employeeValue:any)
  {
    return this.httpClient.post(this.baseUrl + 'employeesave' ,employeeValue)
  }
  updateEmployee(employeeValue:any)
  {
    return this.httpClient.post(this.baseUrl + 'employeeupdate' ,employeeValue)
  }
  deleteEmployee(employeeId:any)
  {
    return this.httpClient.post(this.baseUrl + 'employeedelete' ,employeeId)
  }
}
