import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from '../models/student';
import { college } from '../models/college';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



private clgurl= 'http://localhost:8080/api/v1/student'


  constructor(private http: HttpClient,private auth:AuthService) { }


  


  getStudentsByCollegeId(id:string): Observable<any> {
    const token=this.auth.getAuthData().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<college[]>(`${this.clgurl}/collegeId/${id}`,{headers} );
  }

  addStudent(studentPayload: any): Observable<any> {
    const token=this.auth.getAuthData().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.clgurl}/add`, studentPayload, {headers});
  }

  updateStudent(student: any): Observable<any> {
    const token=this.auth.getAuthData().token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);    
    return this.http.put<any>(`${this.clgurl}/update/${student?.hallTicketNo}`, student, {headers});
  }
}



