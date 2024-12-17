import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CollegeService } from 'src/app/services/college.service';

@Component({
  selector: 'app-university-dashboard',
  templateUrl: './university-dashboard.component.html',
  styleUrls: ['./university-dashboard.component.css']
})
export class UniversityDashboardComponent implements OnInit {

  college:any={}
  constructor(private clg:CollegeService,private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.fetchclgdetails(); 
  }


  fetchclgdetails():void{
    const id=this.auth.getAuthData().id;
    this.clg.fetchcollege(id).subscribe(
      response=>{
        this.college=response.data
        console.log(this.college.data);
        this.clg.setdetails(this.college)
      },
      error=>{
        console.log("Fetch college error")
      }
    );
  }

  // getPlacements(){

  // }


  registerCollege(form:NgForm){
    const formdata=form.value;
    formdata.collegeAdminId=this.auth.getAuthData().id;
    console.log(formdata)
    this.clg.register(formdata).subscribe(
      response=>{
        console.log(response);
        this.fetchclgdetails();
        // this.router.navigate(['/university-dashboard']);
      },
      error=>{
        console.log(error.message);
        console.log(error)
        console.log("Register failed");
      }
    )
    
  }
  resetForm(form:NgForm){
     return form.resetForm();
  }
  get Iscollege():boolean{
    return this.clg.iscollege();
  }
}
