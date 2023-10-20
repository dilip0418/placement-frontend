import { Component } from '@angular/core';
import { CollegeService } from 'src/app/services/college/college.service';
import { DriveService } from 'src/app/services/drive/drive.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {

  colleges: any[] = [];

  drivePayload = {
    name: '',
    date: '',
    qualification: '',
    year: '',
    userId: localStorage.getItem('userId'),
    collegeId: ''
  }
  collegeId: any;

  constructor(private collegeService: CollegeService, private driveService: DriveService) {
    this.collegeService.getAllColleges();
    this.collegeService.allCollege$.subscribe(
      (colleges) => {
        this.colleges = colleges;
        console.log(this?.colleges)
      }
    )
  }


  scheduleDrive() {
    this.collegeId = this.drivePayload.collegeId;
    console.log(this.drivePayload)
    this.driveService.scheduleDrive(this.drivePayload).subscribe(
      res => {
        console.log(res.data);
      }
    );
  }
}
