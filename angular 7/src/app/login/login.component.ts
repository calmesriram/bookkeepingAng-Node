import { Input, Component,OnInit,OnDestroy ,Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;

  constructor(public api:ApiService,public authService: AuthService,public route:Router) { }

  ngOnInit() {  
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // console.log(user);
    });
    // this.check();
  }
  ngOnDestroy(){
  window.location.reload();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async x => {
      console.log(x.email)      
      let payload ={
        "Email":await x.email
      }
      this.api.PostLogin(payload).then(res =>{
        console.log(res);
        if(res['status'] == true){
          this.api.hide = true;
          sessionStorage.setItem("hide","true");
          this.api.snackmsg(res["msg"],"close")
          sessionStorage.setItem("user",'requiredtrue');
          this.route.navigateByUrl('menu')
          return;
        }
      }).catch(e =>{        
        console.log(e);
      })
    });
  }
  // check(){
  //   setInterval(()=>{
  //    let a = sessionStorage.getItem("user");
  //    if(a == "false" ){
  //      this.api.hide = false;
  //    }
  //   },5000)
  // }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signOut(): void {
    this.authService.signOut();
  }

  form: FormGroup = new FormGroup({
    Email: new FormControl(''),
    // email: new FormControl(''),
  });
  Register: FormGroup = new FormGroup({
    Email: new FormControl(''),
    // email: new FormControl(''),
  });

  login() {   
    console.log(this.form.value.Email)
    if (this.form.value.Email == null || this.form.value.Email == "" || this.form.value.Email == undefined) {
      this.api.snackmsg("requied fill the filed","close")
      return;
    }
      this.api.PostLogin(this.form.value).then(res =>{
        // console.log(res);
        if(res['status'] == true){
          this.api.hide = true;
          sessionStorage.setItem("hide","true");
          this.api.snackmsg(res["msg"],"close")
          sessionStorage.setItem("user",'requiredtrue');
          this.route.navigateByUrl('menu')
          return;
        }
        if(res['status'] == false){
          this.api.hide = true;
          sessionStorage.setItem("hide","true");
          this.api.snackmsg(res["msg"],"close")  
          sessionStorage.setItem("user",'requiredtrue');
          return;
        }
      }).catch(e =>{        
        console.log(e);
      })
    // }
  }
  reg() {    
    if (this.Register.valid) {
      console.log(this.Register.value)
      this.api.PostReg(this.Register.value).then(res =>{
        console.log(res);
       this.api.snackmsg(res["msg"],"close")
      }).catch(e =>{
        console.log(e);
      })
    }
  }
}
