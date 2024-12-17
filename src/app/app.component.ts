import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'placement';
  
  username:string| null=null;

  constructor(private auth:AuthService) { }

  ngOnInit() {

  }

  get isLoggedIn():boolean{
        return this.auth.isAuthenticated();
  }
  logout(){
        return this.auth.logoutUser();
  }
  get  userRole():string{
    const role =this.auth.getAuthData().role;
    return role;
  }
}
