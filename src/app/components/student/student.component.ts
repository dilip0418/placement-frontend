import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CollegeService } from 'src/app/services/college.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students:any=[];
  selectedStudent: any={}; 
  
  
  constructor(private auth:AuthService,private clg:CollegeService,private student:StudentService,private router:Router) { }

  ngOnInit() {
    this.getallstudents()
  }

  getallstudents():void{
    const id=this.clg.getcollge().id;
    this.student.getStudentsByCollegeId(id).subscribe(
      response=>{
        this.students=response.data;
        console.log(response);
        console.log(this.students);
      },
      error=>{
        console.log("fetching students eror",error);
      }
    )
  }
  viewCertificate(student: any) {
    this.selectedStudent = student;
  }

  addStudent(form:NgForm){
      console.log("Inside student");
      form.value.collegeId=this.clg.getcollge().id;
      const formdata=form.value;
      console.log(formdata);
      console.log(form.value);
      this.student.addStudent(formdata).subscribe(
        response=>{
          console.log(response);
          this.getallstudents();
        },
        error=>{
          console.log("error",error);
        }
      )
  }

  editStudent(student: any) {
    this.selectedStudent = student;
  }
  
  updateStudent(form:NgForm){
    console.log(this.selectedStudent);
    this.selectedStudent.collegeId=this.clg.getcollge().id;
      const data=this.selectedStudent;
      console.log(data);
      this.student.updateStudent(data).subscribe(
        response=>{
          console.log(response);
          this.router.navigate(['/student']);
          
        },
        error=>{
          console.log("erro update",error);
        }
      )
  }


}
