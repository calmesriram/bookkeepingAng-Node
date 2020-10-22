import { Input, Component,OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: SocialUser;
  
  constructor(public authService: AuthService,public api:ApiService,public route:Router) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });

    // setTimeout(()=>{ 
    //   window.location.reload();
    // },200)
    // this.check();
  }
  // 211054143954-q3nln96f5snjq7kkun3peni6b6u068jt.apps.googleusercontent.com
  // huKBpJGb3o3zXEN13qHvCOdm
  test(){
    this.api.hide = false;
    this.api.snackmsg("logout successfull","close")
    this.authService.signOut();
    sessionStorage.clear();
    this.route.navigateByUrl('login')
    sessionStorage.setItem("hide","false");

  }
}
