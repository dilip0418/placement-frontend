import { Component, OnInit } from '@angular/core';
import { CollegeService } from 'src/app/services/college/college.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any[] = [];
  selectedStudent: any; // You might want to define a proper interface for Student instead of 'any'
  collegeName!: string;

  constructor(private studentService: StudentService, private collegeService: CollegeService) {
    console.log("Inside Student contructor")
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  getCollegeName() {
    this.collegeName = this.collegeService.collegeName;
  }

  loadStudents() {
    this.studentService.getStudentsByCollegeId()
      .subscribe(
        (response: any) => {
          const { message, status, data } = response;

          //Externally Adding the college Id because it's a dependency hence in the bakground this requires collegeId
          for (let index = 0; index < data.length; index++) {
            data[index].collegeId = (localStorage.getItem('collegeId'));
          }
          this.students = data;
          console.log(this.students);
        }
      )
  }

  studentPayload = {
    name: '',
    collegeId: localStorage.getItem('collegeId'),
    qualification: '',
    course: '',
    yop: '',
    hallTicketNo: ''
  }

  addStudent() {
    console.log("Inside addStudent()!!")
    console.log(this.studentPayload);
    this.studentService.addStudent(this.studentPayload)
      .subscribe(
        (response) => {
          console.log(response);
          const { message, status, data } = response;
          this.students.push(data);
          console.log(this.students)
          // clear the payload
          this.studentPayload = this.studentPayload = {
            name: '',
            collegeId: '',
            qualification: '',
            course: '',
            yop: '',
            hallTicketNo: ''
          };
        }
      )
  }

  viewCertificate(student: any) {
    this.selectedStudent = student;
  }

  editStudent(student: any) {
    this.selectedStudent = student;
  }

  updateStudent() {
    if (this.selectedStudent) {
      console.log(this.selectedStudent)
      // Assuming your Spring Boot API expects the hallTicketNo as a path parameter
      this.studentService.updateStudent(this.selectedStudent)
        .subscribe(
          (updatedStudent) => {
            console.log('Student updated:', updatedStudent);

            // Find the index of the updated student
            const index = this.students.findIndex((student) => student.id === updatedStudent.id);

            if (index !== -1) {
              // Update the student data in the array
              this.students[index] = updatedStudent;
            }
          });
    }
  }
}

