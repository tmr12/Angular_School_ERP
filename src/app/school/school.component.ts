import { Component, OnInit, Optional, Inject } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  rating = 1;
  starColor: string;
  starCount = 5;
  edit: boolean = false;
  constructor(private service: SchoolService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SchoolComponent>,) {
      this.edit = data.edit;
     }

  ngOnInit() {
  }

  onRatingChanged(rating){
    this.rating = rating;
    if (this.rating >= 4) {
      this.starColor = 'primary'
    } else if (this.rating < 4 && this.rating >= 2.5) {
      this.starColor = 'accent';
    } else {
      this.starColor = 'warn';
    }
    this.service.form.controls.rating.setValue(this.rating);
  }

  onClose() {
    this.dialogRef.close();
  }

}
