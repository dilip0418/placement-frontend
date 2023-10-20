import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  private apiUrl = "http://localhost:8080/api/v1/drive";

  private driveSubject = new BehaviorSubject<any[]>([]);
  public drives$ = this.driveSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchDrives() {
    const token = localStorage.getItem('jwtToken');
    const collegeId = localStorage.getItem('collegeId');

    console.log("Inside fetch drives method");
    this.http.get<any>(`${this.apiUrl}/collegeId/${collegeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .subscribe(
        (response) => {
          this.driveSubject.next(response.data);
        }
      );
  }

  private driveSubjectPaticularUser = new BehaviorSubject<any[]>([]);
  public drivesByUserId$ = this.driveSubjectPaticularUser.asObservable();

  fetchDrivesByUserId() {
    console.log("Inside DriveService!!!")
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId')
    return this.http.get<any>(`${this.apiUrl}/allDrivesByUserId/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .subscribe(
        (response) => {
          this.driveSubjectPaticularUser.next(response.data);
          console.log(response.data);
        }
      );
  }

  scheduleDrive(drive: any) {
    console.log(drive)
    return this.http.post<any>(`${this.apiUrl}/create/add`, drive, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });

  }
}
