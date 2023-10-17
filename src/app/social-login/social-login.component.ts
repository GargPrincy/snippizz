import { Component } from '@angular/core';
import { SocialAuthService } from  '@abacritt/angularx-social-login';
import { SocialUser ,FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent {
  
  public user!: SocialUser;
  socialUser!: SocialUser;

  public isLoggedin: boolean = false;
  
 

  constructor(private authService: SocialAuthService) {
    const fbLoginOptions = {
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      return_scopes: true,
      enable_profile_selector: true
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    
    const googleLoginOptions = {
      scope: 'profile email'
    };
    // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
    
  
    /*let config = [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("Google-OAuth-Client-Id", googleLoginOptions)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Facebook-App-Id", fbLoginOptions)
      },
      
    ];*/
    

   }

  ngOnInit() {
   this.authService.authState.subscribe((user) => {
      this.user = user;
      
      this.isLoggedin = (user != null);
    }); /**/
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    const fbLoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email,public_profile',
      auth_type: 'rerequest'
    };
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
        console.log(data);
        console.log("amansinghghidhkgsl")
      });
  }



  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
