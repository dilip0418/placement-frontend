import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl_college = 'http://localhost:8080/api/v1/college'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }
  id = localStorage.getItem('id');

  getCollegeByAdminId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl_college}/college-admin/${id}`);
  }

  createCollege(collegeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl_college}/create-college`, collegeData);
  }

  

}
