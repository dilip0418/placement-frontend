import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


interface College {
  id: string;
  collegeName: string;
  location: string;
  collegeAdminName: string;
  collegeAdminEmail: string;
}

interface PlacementData {
  id: number,
  name: string,
  date: string,
  qualification: string,
  year: number,
  collegeName: string,
  collegeLocation: string
}

@Component({
  selector: 'app-university-dashboard',
  templateUrl: './university-dashboard.component.html',
  styleUrls: ['./university-dashboard.component.css']
})
export class UniversityDashboardComponent implements OnInit {

  API_URL_COLLEGE = "http://localhost:8080/api/v1/college/"
  API_URL_DRIVE = "http://localhost:8080/api/v1/drive/"


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
  constructor(private http: HttpClient, public router: Router) {
    // Get the college admin id from the local storage
  }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    console.log(this.college);
    const collegeAdminId = localStorage.getItem('userId');

    // Send a GET request to fetch the college details
    this.http.get<any>(
      this.API_URL_COLLEGE + `college-admin/${collegeAdminId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe(
      (response) => {
        const { message, status, data } = response;
        console.log("message", message);
        this.college = data;

        localStorage.setItem('collegeId', data.id);
      }
    );
  }

  registerCollege() {

    const token = localStorage.getItem('jwtToken');
    console.log(this.collegeData);
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
  }

  placementData!: PlacementData;


  placements: Array<PlacementData> = [];


  getPlacements() {
    const token = localStorage.getItem('jwtToken');
    const collegeId = localStorage.getItem('collegeId');
    console.log(collegeId);
    this.http.get<any>(this
      .API_URL_DRIVE + `collegeId/${collegeId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe(
      (response) => {
        const { message, status, data } = response;

        console.log(message);
        if (status == '200') {
          console.log(data);
          for (let i of data) {
            this.placements.push(i);
          }
          console.log(this.placements);
        }
        else {
          console.log('failed');
        }

      });
  }


  // Define the resetForm method to clear the form fields
  resetForm(form: NgForm) {
    form.resetForm();
  }


}


