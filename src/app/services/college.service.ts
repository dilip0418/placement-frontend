import { college } from './../models/college';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private id: string|null=null;
  private collegeName: string|null=null;
  private location: string|null=null;
  private collegeAdminName: string|null=null;
  private collegeAdminEmail: string|null=null;
  

setdetails(data:any){
  this.id=data.id;
  this.collegeName=data.collegeName;
  this.location=data.location;
  this.collegeAdminEmail=data.collegeAdminEmail;
  this.collegeAdminName=data.collegeAdminName
  console.log(this.id,this.collegeAdminEmail,this.location,this.collegeAdminName,this.collegeName)
}
getcollge():any{
  return{
    id:this.id,
    collegeName:this.collegeName,
    location:this.location,
    collegeAdminName:this.collegeAdminName,
    collegeAdminEmail:this.collegeAdminEmail,
  };
}
  iscollege():boolean{
    return !!this.collegeName;
  }
constructor(private http:HttpClient,private auth:AuthService) { }


clg_url='http://localhost:8080/api/v1/college';

getallColleges():Observable<any>{
  const token=this.auth.getAuthData().token;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<college[]>(`${this.clg_url}/all`,{headers})
}
register(data:college): Observable<any> {
  const token=this.auth.getAuthData().token;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  
   return this.http.post(`${this.clg_url}/create`,data,{headers});
}
fetchcollege(id:number):Observable<any>{
  const token=this.auth.getAuthData().token;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<college[]>(`${this.clg_url}/college-admin/${id}`,{headers});
}

}
