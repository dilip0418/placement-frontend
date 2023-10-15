import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


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

  API_URL = "http://localhost:8080/api/v1/college/"

  college!: College;

  // college = {
  //   id: '',
  //   collegeName: '',
  //   location: '',
  //   collegeAdminName: '',
  //   collegeAdminEmail: ''
  // };

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
  constructor(private http: HttpClient) {
    // Get the college admin id from the local storage

  }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    console.log(this.college);
    const collegeAdminId = localStorage.getItem('userId');

    // Send a GET request to fetch the college details
    this.http.get<any>(
      this.API_URL + `college-admin/${collegeAdminId}`,
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
      }
    );
  }

  registerCollege() {

    const token = localStorage.getItem('jwtToken');
    console.log(this.collegeData);
    console.log(token);
    this.http.post(
      this.API_URL + "create",
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

  // Define the resetForm method to clear the form fields
  resetForm(form: NgForm) {
    form.resetForm();
  }


}


