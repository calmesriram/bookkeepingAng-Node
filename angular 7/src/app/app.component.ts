import { Input, Component,OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FormGroup, FormControl } from '@angular/forms';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book';

constructor (public api:ApiService){}

  
}
