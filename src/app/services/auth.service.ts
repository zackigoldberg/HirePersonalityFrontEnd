import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Token } from '../Models/Token';
import { UserInfo } from '../Models/UserInfo';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RegisterUser } from '../Models/RegisterUser';
import { Api_Url} from '../../environments/environment.prod';

@Injectable()

export class AuthService {
  userInfo: Token;
  isLoggedIn = new Subject<boolean>();
  loginInfo: UserInfo;

  constructor(private _http: HttpClient, private _router:Router) { }

    register(regUserData: RegisterUser) {
      return this._http.post(`${Api_Url}/api/Auth/Register`, regUserData); 
    }
    
    login(loginInfo) {
      return this._http.post(`${Api_Url}/api/Auth/Login`, loginInfo).subscribe( (token: any) => {
        localStorage.setItem('token', token.token);
        localStorage.setItem('admin', token.admin);
        localStorage.setItem('userId', token.user.id);
        console.log(token.admin);
        this.isLoggedIn.next(true);
        this._router.navigate(['/home']);
        window.location.reload();
      });
    }

    currentUser() :boolean {
      if(!localStorage.getItem('token')) {return false;}
      return true;
    }

    isAdminUser(): boolean {
      if(localStorage.getItem('admin') == "true") {return true;}
      return false;
    }

    logout() {
      localStorage.clear();
      this.isLoggedIn.next(false);

      const authHeader = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
      this._http.post(`${Api_Url}/api/Account/Logout`, {headers: authHeader});
      this._router.navigate(['/login'])
      window.location.reload();
    }
}

