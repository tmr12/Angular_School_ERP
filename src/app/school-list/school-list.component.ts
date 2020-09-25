import { Component, OnInit, ViewChild } from '@angular/core';
import { School } from '../modals/school';
import { MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { SchoolService } from '../services/school.service';
import { SchoolDetailComponent } from '../school-detail/school-detail.component';
import { SchoolComponent } from '../school/school.component';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  displayedColumns: string[] = ['schoolId', 'schoolName', 'address', 'board', 'rating', 'staffCount', 'studentsCount', 'facilities', 'comments', 'location','actions'];
  dataSource :MatTableDataSource<School> ;
  searchKey: string;
  
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getSchools();
     
  }
  ngAfterViewInit() {
  }
  private getSchools() {
    this.schoolService.getSchoolList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log('Printing schoolList:', data);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.location.toLowerCase().includes(filter) ;
      };
    });
  }
  applyFilter() {
    this.searchKey = this.searchKey.trim(); // Remove whitespace
    this.searchKey = this.searchKey.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.searchKey;
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  onView(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    // dialogConfig.position = {top:'15%'};
    dialogConfig.hasBackdrop= true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(SchoolDetailComponent, dialogConfig);
  }

  onEdit(row) {
    this.schoolService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {edit: true};
    dialogConfig.width = "65%";
    // dialogConfig.height = '100%';
    this.dialog.open(SchoolComponent,dialogConfig);
  }

}
