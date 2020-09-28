import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider,  SocialUser,  SocialAuthService } from 'angularx-social-login';
import { SchoolService } from './services/school.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Schools';
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService, private schoolService: SchoolService) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.schoolService.loggedIn = this.loggedIn;
    });
  }
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }
}
