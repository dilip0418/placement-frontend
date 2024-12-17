import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/services/drive.service';

@Component({
  selector: 'app-corporate-dashboard',
  templateUrl: './corporate-dashboard.component.html',
  styleUrls: ['./corporate-dashboard.component.css']
})
export class CorporateDashboardComponent implements OnInit {
  drives:any={};
  constructor(private drive:DriveService) { }

  ngOnInit() {
    this.fetchdrive();
  }
  fetchdrive():void{
    this.drive.getalldrive().subscribe(
      response=>{
        console.log(response);
        this.drives=response.data;
      },
      error=>{
        console.log("drive fetching faied",error);
      }
    )
  }

}
