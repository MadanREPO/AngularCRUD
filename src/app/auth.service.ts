import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  baseUrl ='localhost:8080/api/'
  constructor(private httpClient:HttpClient) { }

  getAuthStatus(){

    // for canactivate auth guard to check if user can access a path

    this.loggedIn.next(!!localStorage.getItem('authorizationData'));

    return true

  }

  login(loginValue:any)
  {
    return this.httpClient.post(this.baseUrl + 'login' ,loginValue)
  }
}
