import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CollegeService } from 'src/app/services/college.service';
import { DriveService } from 'src/app/services/drive.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css'],
})
export class CollegeComponent implements OnInit {
  colleges: any[] = [];
  selectedCollege:any={}

  constructor(private college: CollegeService,private auth:AuthService, private router: Router,private drive:DriveService) {}

  ngOnInit() {
    this.getcolleges();
  }
  selectCollege(clg:any){
      this.selectedCollege=clg;
      console.log(this.selectedCollege);
  }
  getcolleges(): void {
    this.college.getallColleges().subscribe(
      (response) => {
        this.colleges = response.data;      
       
      },
      (error) => {
        console.log('Fetching college error');
      }
    );
  }


  scheduleDrive(form: NgForm) {
    form.value.userId=this.auth.getAuthData().id;
    const data=form.value;
    console.log(data);
   
    console.log(data);
        this.drive.scheduleDrive(data).subscribe(
          response=>{
              console.log(response);
          },
          error=>{
                console.log("shedule drive error ocuured");
          }
        )
  }
}
