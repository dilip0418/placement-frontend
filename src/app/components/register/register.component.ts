import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register_data:any={};
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }
  register(form:NgForm){
        const data=form.value;
        console.log(data);
        this.auth.register(data).subscribe(
          response=>{  
            console.log(response); 
            this.router.navigate(['/login']);
          },        
        error=>{
          console.error('Registration failed:', error);         
        }
        );
  }

  resetForm(form:NgForm){
    form.resetForm();
  }
}
