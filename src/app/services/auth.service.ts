import { Observable } from 'rxjs';
import { User} from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 
  private id: number|null =null;
  private email: string|null=null;
  private role: string|null=null;
  private token: string|null=null;
  private status: number|null=null;

  setAuthData(data: any): void {
    this.id = data.id;
    this.email = data.email;
    this.role = data.role;
    this.token = data.token;
    this.status = data.status;    
  }
  getAuthData(): any {
    return {
      id: this.id,
      email: this.email,
      role: this.role,      
      token: this.token,      
      status: this.status
    };
  }
  logoutUser() {
    this.id = null;
    this.email=null;
    this.role=null;   
    this.token=null;
    localStorage.removeItem('token');
    location.reload();
  }
  isAuthenticated(): boolean {
    return !!this.token ;
  }

  constructor(private http:HttpClient) { }

  private login_url='http://localhost:8080/api/v1/auth';
  private register_url='http://localhost:8080/api/v1/auth'
  
  
  login(data:User):Observable<User[]>{
    return this.http.post<User[]>(this.login_url+"/authenticate",data);
  }
  register(data:User):Observable<User[]>{
    return this.http.post<User[]>(this.register_url+'/register',data);
  }

}
