import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { drive } from '../models/drive';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private http:HttpClient,private auth:AuthService) {}

  private drive_url='http://localhost:8080/api/v1/drive';

  scheduleDrive(data:drive):Observable<any>{
    const token=this.auth.getAuthData().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<drive>(`${this.drive_url}/create/add`,data,{headers});
  }
  getall(id:number):Observable<any>{
    const token=this.auth.getAuthData().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`) ;
    return this.http.get<any>(`${this.drive_url}/collegeId/${id}`,{headers});
  }
  getalldrive():Observable<any>{
    const id=this.auth.getAuthData().id;
    const token=this.auth.getAuthData().token;
    console.log(id,token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`) ;
    return this.http.get<drive[]>(`${this.drive_url}/allDrivesByUserId/${id}`,{headers});
  }
}
