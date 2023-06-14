import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(values: {registration: string, password: string}){
    return this.http.post<User>(environment.GEDUC_API + '/v1/user/auth',  values).pipe(tap((response) => {
      sessionStorage.setItem('user', JSON.stringify(response));
    }));
  }

  register(filter: any) {
    return this.http.post<User>(environment.GEDUC_API + '/v1/user', filter);
  }

  getLoggedUserEndpoint(registration: string) {
    return this.http.get<User>(environment.GEDUC_API + '/v1/user/'+ registration);
  }

  changePassword(filter: any) {
    return this.http.put<User>(environment.GEDUC_API + '/v1/user/change/password', filter);
  }

  clear(){
    sessionStorage.clear()
  }

  isAuthenticated(){
    return (sessionStorage.getItem('user')!==null?true:false);
  }

  getLoggedUser(): User {
    return sessionStorage.getItem('user')!==null ? JSON.parse(sessionStorage.getItem('user')) : null;
  }

  logout(){
    this.clear();
  }

  setStorage(user: User) {
    this.clear();
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}
