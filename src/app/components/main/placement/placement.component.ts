import { Component } from '@angular/core';
import { DriveService } from 'src/app/services/drive/drive.service';




@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})



export class PlacementComponent {

  drives: any[] = [];
  constructor(private driveService: DriveService) {
    this.driveService.drives$.subscribe(
      (drives) => {
        this.drives = drives;
      }
    )
  }
}
