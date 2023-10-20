import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  API_URL_COLLEGE = "http://localhost:8080/api/v1/college";

  private collegeSubject = new BehaviorSubject<any>(null);
  public colleg$: Observable<any> = this.collegeSubject.asObservable();

  collegeName!: string;

  constructor(private http: HttpClient) { }

  fetchCollegeDetails(collegeAdminId: string | null, token: string | null): void {
    this.http.get<any>(`${this.API_URL_COLLEGE}/college-admin/${collegeAdminId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe((response) => {
      const { message, status, data } = response;
      this.collegeSubject.next(data);
    });
  }

  private allCollegeSubject = new BehaviorSubject<any>(null);
  public allCollege$: Observable<any> = this.allCollegeSubject.asObservable();

  getAllColleges() {
    const token = localStorage.getItem('jwtToken');
    return this.http.get<any>(`${this.API_URL_COLLEGE}/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe(
        (res) => {
          const { message, status, data } = res;
          this.allCollegeSubject.next(data);
          this.collegeName = data.collegeName;
        }
      );
  }
}
