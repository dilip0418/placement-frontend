import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = 'http://localhost:8080/api/v1/student'


  constructor(private http: HttpClient) { }
  token = localStorage.getItem('jwtToken');
  collegeId = localStorage.getItem('collegeId');


  getStudentsByCollegeId(): Observable<any[]> {
    return this.http.get<any>(
      `${this.API_URL}/collegeId/${this.collegeId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  addStudent(studentPayload: any): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/add`, studentPayload, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
    );
  }

  updateStudent(student: any): Observable<any> {
    // console.log(student.hallTicketNo);
    console.log(student);
    return this.http.put<any>(
      `${this.API_URL}/update/${student?.hallTicketNo}`, student, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
    )
  }
}
