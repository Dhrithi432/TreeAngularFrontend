import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from  '@angular/common/http';

export interface Tree{
  mainbranch: string;
  count?: number;
  emp_id:number;
  name?:string;
  employeeId?: string;
  designation?: string;
  dateOfJoining?: string;
  paginator?:boolean;
  childOfMainBranch?: Tree[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl = 'http://localhost:8082/ust/v1/getProject';
  postUrl = 'http://localhost:8080/ust/v1/creatree';
  deleteUrl = 'http://localhost:8082/ust/v1/deletedetails';

  constructor(private http: HttpClient) { }

  GetData(): Observable<any>{
    return this.http.get<any>(this.dataUrl);
  }

  postData(body: any):Observable<any>{
    return this.http.post(this.postUrl,body);
  } 

  deleteData(emp_id):Observable<any>{
    return this.http.delete(`${this.deleteUrl}/${emp_id}`);
  }

  // deleteData(emp_id:number): Observable<number>{
  //   let httpheaders = new HttpHeaders()
  //     .set('Content-type','application/Json');
  //   let options = {
  //     headers: HttpHeaders
  //   };
  //   return this.http.delete<number>(this.deleteUrl+"/"+emp_id);
  // }

}
