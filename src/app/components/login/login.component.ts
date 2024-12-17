import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_details:any={};
  constructor(private auth:AuthService,private router:Router ) {}

  ngOnInit() {
    
  }


  login(form:NgForm){
    const formdata=form.value;
    console.log(formdata)
    this.auth.login(formdata).subscribe(
      response=>{
        
        this.login_details=response;
        console.log(this.login_details.data);
        this.auth.setAuthData(this.login_details.data);
        if (this.auth.getAuthData().role === 'ROLE_UNIVERSITY') {
          console.log('Inside university-dashboard')
          this.router.navigate(['/university-dashboard']);
        } else if (this.auth.getAuthData().role === 'ROLE_CORPORATE') {
          console.log('Inside corporate-dashboard')
          this.router.navigate(['/corporate-dashboard']);
        }
      },
      error=>{
        console.log("Error occured");
      }
      
      
    );
      
    
   

  }
  resetForm(form:NgForm){
      form.resetForm();
  }

}
