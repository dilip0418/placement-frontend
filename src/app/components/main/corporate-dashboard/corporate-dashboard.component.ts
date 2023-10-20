import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/services/drive/drive.service';

@Component({
  selector: 'app-corporate-dashboard',
  templateUrl: './corporate-dashboard.component.html',
  styleUrls: ['./corporate-dashboard.component.css']
})
export class CorporateDashboardComponent implements OnInit {

  data = [
    'Dilip', 'Ganesh', 'Prajaktha', 'Sandeep', 'Tushar', 'Venu'
  ]

  drives: any[] = [];

  
  constructor(private driveService: DriveService) {
    this.driveService.fetchDrivesByUserId();
  }
  ngOnInit(): void {
    this.driveService.drivesByUserId$.subscribe(
      (drives) => {
        this.drives = drives;
      }
    );
  }
}