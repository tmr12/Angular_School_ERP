import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../modals/school';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  // private baseURL = "http://localhost:9200/schoolManagement/";
  private baseURL = 'assets/data/schoolList.json';
  constructor(private httpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    schoolId: new FormControl('', Validators.required),
    schoolName: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    board: new FormControl(''),
    staffCount: new FormControl('', Validators.required),
    studentsCount: new FormControl('',Validators.required),
    facilities: new FormControl(''),
    rating: new FormControl('',Validators.required),
    comments: new FormControl(''),
    location: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      schoolId: '',
      schoolName: '',
      address: '',
      board: '',
      staffCount: '1',
      studentsCount: 0,
      facilities: '',
      rating: 0,
      comments: '',
      location: ''
    });
  }
  populateForm(school) {
    this.form.setValue(_.omit(school,'picByte'));
  }

  getSchoolListByLocation(locationname: string): Observable<School[]>{
    let locationURL = this.baseURL+"location";
    return this.httpClient.get<School[]>(`${locationURL}/${locationname}`);
  }
  
  
  getSchoolList(): Observable<School[]>{
    return this.httpClient.get<School[]>(`${this.baseURL}`);
  }

  createSchool(school: School): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,school);
  }

  
  getSChoolById(id: number): Observable<School>{
    return this.httpClient.get<School>(`${this.baseURL}/${id}`);
  }

  updateSChool(id:number,school:School): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,school);
  }

  deleteSChool(id:number): Observable<Object>{
   return this.httpClient.delete(`${this.baseURL}/${id}`);
 }

}
