import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CollegeService } from 'src/app/services/college/college.service';
import { DriveService } from 'src/app/services/drive/drive.service';


interface College {
  id: string;
  collegeName: string;
  location: string;
  collegeAdminName: string;
  collegeAdminEmail: string;
}


@Component({
  selector: 'app-university-dashboard',
  templateUrl: './university-dashboard.component.html',
  styleUrls: ['./university-dashboard.component.css']
})
export class UniversityDashboardComponent implements OnInit {

  API_URL_COLLEGE = "http://localhost:8080/api/v1/college/";

  college!: College;

  collegeData = {
    collegeName: '',
    collegeAdminId: localStorage.getItem('userId'),
    location: ''
  };

  hasValidCollegeData(college: College): boolean {
    return (
      college.id !== '' ||
      college.collegeName !== '' ||
      college.location !== '' ||
      college.collegeAdminName !== '' ||
      college.collegeAdminEmail !== ''
    );
  }

  constructor(private http: HttpClient, public router: Router, private driveService: DriveService, private collegeService: CollegeService) {
    // location.reload();
  }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    const collegeAdminId = localStorage.getItem('userId');
    this.collegeService.fetchCollegeDetails(collegeAdminId, token);

    this.collegeService.colleg$.subscribe(
      (college) => {
        this.college = college;
        console.log(this.college);
        localStorage.setItem('collegeId', this.college?.id);
      }
    )

  }

  registerCollege() {

    const token = localStorage.getItem('jwtToken');
    // console.log(this.collegeData);
    console.log(token);
    this.http.post(
      this.API_URL_COLLEGE + "create",
      this.collegeData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: (response: any) => {
          const { message, status, data } = response;
          console.log(data);
          if (status == '200') {
            this.college.id = data.id;
            this.college.collegeName = data.collegeName;
            this.college.location = data.location;
            this.college.collegeAdminName = data.collegeAdminName;
            this.college.collegeName = data.collegeName;
          }
        }
      }
      );
    location.reload();
  }

  getPlacements() {
    this.driveService.fetchDrives();
  }


  // Define the resetForm method to clear the form fields
  resetForm(form: NgForm) {
    form.resetForm();
  }


}


