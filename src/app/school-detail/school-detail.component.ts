import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { School } from '../modals/school';

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.css']
})
export class SchoolDetailComponent implements OnInit {

  school: School;
  starColor: string;

  constructor( 
    public dialogRef: MatDialogRef<SchoolDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) { 
      this.school = data;
      if (this.school.rating >= 4) {
        this.starColor = 'primary'
      } else if (this.school.rating < 4 && this.school.rating >= 2.5) {
        this.starColor = 'accent';
      } else {
        this.starColor = 'warn';
      }
    }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
  }

  

}
