import { HomeList } from './../../models/common/home/home-list.model';
import { Component } from '@angular/core';
import { SocialAuthService } from  '@abacritt/angularx-social-login';
import { SocialUser ,FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HomeService } from 'src/services/home/home.service';
//import { IndexModel } from 'src/models/common/index.model';
import { Title } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder,FormControl } from '@angular/forms';
import * as jQuery from 'jquery';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public user!: SocialUser;
  socialUser!: SocialUser;

  public isLoggedin: boolean = false;
  public homeAllData:any = [];
  public subContent:string = "";
  public soundStatus:boolean =true;
  public selected: boolean = false;
  //public homeAllData : [] = [];
 // public indexModel: IndexModel;
  
 

  constructor(private authService: SocialAuthService,
    private _homeService: HomeService,
    private titleService: Title    ,
    private formBuilder: FormBuilder,
    ) {  

      console.log("cccccc",this.selected);
     
      this.titleService.setTitle("Snippizz Home");
      this.homeAllData = [];
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
   checkoutForm = this.formBuilder.group({
    searchKey: ''
  });  

  get f() { return this.checkoutForm.controls; }

  public onSubmit() {
    console.log("ay",this.checkoutForm.value);

   

  }
  public onSubmits(vla:number) {
    var yes = $("#checkkket").val();;  

    // <span id="onBtn" >on</span>
    // <span id="offBtn">off</span>     
    // console.log(this.soundStatus,"amassn");
    console.log("dddddddddddddddddd",this.soundStatus);
    if(this.soundStatus == true){
      this.soundStatus=false;
      localStorage.setItem("soundProp","2" );
      $("#offBtn").css("display", "block");
      $("#onBtn").css("display", "none");

    } else if(this.soundStatus == false){
      this.soundStatus=true;
      localStorage.setItem("soundProp","1" );
      $("#onBtn").css("display", "block");
      $("#offBtn").css("display", "none");
    } 
   
      

    //console.log(this.soundStatus,"aman");
  }
  public onSubmitss(vla:number) {
    console.log("aysss",vla);

   

  }
  
  doAction(event:any){
    console.log(event.target.checked)
    if(event.target.checked == true){
      localStorage.setItem("soundProp","1" );
    } else if(event.target.checked == false){
      localStorage.setItem("soundProp","2" );
    }
    
  }
  ngOnInit() {
    this.titleService.setTitle("Snippizz Home");
    console.log("ngon",this.selected);
   this.getData();
   this.authService.authState.subscribe((user) => {
      this.user = user;      
      this.isLoggedin = (user != null);
    }); /**/
   

    let soundStatusCheck = localStorage.getItem("soundProp");

    if(soundStatusCheck ==null ||  soundStatusCheck ==undefined ||  soundStatusCheck == "" ){
      localStorage.setItem("soundProp","1" );
      this.playAudio();
    }
    console.log(soundStatusCheck,"amnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  }
  
  playAudio(){
    let audio = new Audio();
    audio.src = "./assets/audios/click.wav";
    audio.load();
    audio.play();
  }
 pauseAudio() {
    let audio = new Audio();
    audio.src = "./assets/audios/click.wav";
    audio.load();
    audio.pause();
 
  }

  private getData() {
    this._homeService.getHomeRecords().subscribe(
      response => {
          console.log("get data",response)
           // if (response.body?.isSuccess) {
          this.homeAllData = response;
        //  this.subContent = response.info?.content
         // this.users = response.body?.data?.data ?? [];
   
        //}
      }
    );
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
  openModelData() { 
    $('#playModal').modal('hide'); 
    $('#settingssss').modal('show');   
  }
}
