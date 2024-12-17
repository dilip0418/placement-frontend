import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DriveService } from 'src/app/services/drive.service';
import { CollegeComponent } from '../college/college.component';
import { CollegeService } from 'src/app/services/college.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})
export class PlacementComponent implements OnInit {
    drives:any={}
  constructor(private drive:DriveService,private clg:CollegeService) { }

  ngOnInit() {
    this.fetchalldrives();
  }
  fetchalldrives():void{
    const id=this.clg.getcollge().id;
    this.drive.getall(id).subscribe(
      response=>{
        this.drives=response.data;
        console.log(response);
      },
      error=>{
        console.log("eror while getting drives");
      }
    )
  }

}
