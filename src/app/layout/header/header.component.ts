import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder,FormControl } from '@angular/forms';

import {Router, ActivatedRoute, NavigationEnd,Event,RoutesRecognized } from '@angular/router';
import { HomeService } from 'src/services/home/home.service';
import * as jQuery from 'jquery';
import { VideoListingsService } from 'src/services/video-listings/video-listings.service';
import {concat} from 'rxjs';

import { CategoriesService } from 'src/services/categories/categories.service';



declare var $: any;





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public myForm: FormGroup;


  registerForm!: FormGroup;
  submitted = false;
  
  public globalSound:boolean =  true;
  public homeAllData:any = [];
  public showGuestUserName:any = "";

  public categoriesAllData:any = [];
  public categoriesAllDataHeader:any = [];
  public catId:number=1;

  public showData = 0;
  public showModelPopup:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private _homeService: HomeService,
    private _categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,

  
    private _videoListingService: VideoListingsService,

  ) {
    activatedRoute.params.subscribe(params => {
      console.log("store", params); // should not be empty if there really are params.
});
    this.homeAllData = [];
    this.myForm = this.fb.group({
      name:  [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern(/^[A-Za-z]+$/),
        ],
      ],
    });

    this.categoriesAllDataHeader = [];
    //this.playSound("click");
 
   
  }

  checkoutForm = this.formBuilder.group({
    searchKey: ''
  });
  forms = new FormGroup({

    categories: new FormControl('')

  });
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
  public onGoToPage2(){
    this.checkoutForm.reset();
  }
  public onSubmit() {
    console.log("ay",this.checkoutForm.value);
    if(this.checkoutForm.value.searchKey !=""){

    let sessionId =   this.getRandomIntInclusive(1,9999999999);
    let navigationExtras = {
      queryParams: { 'session_id': sessionId , searchKey:this.checkoutForm.value.searchKey},
      fragment: 'anchor'
    };
    
    // Navigate to the login page with extras
    this.router.navigate(['/video-listings',this.checkoutForm.value.searchKey]);
    if(this.checkoutForm.value.searchKey !="" ){
      const searchValue:any = this.checkoutForm.value.searchKey
      this.getAllVideoListing(searchValue);

    }
  }

  }
  public getAllVideoListing(searchKeyword:string) {
    this._videoListingService.getVideoRecords(searchKeyword).subscribe(
      response => {
          console.log("get datazzzzzzzzzzzzzzzz header",response)
          // if (response.body?.isSuccess) {
          this.categoriesAllData = response;
      
          this.showData = 1;
       
          //  this.subContent = response.info?.content
          // this.users = response.body?.data?.data ?? [];   
         //}
      }
    );
  }
  get myFormControl() {
    return this.myForm.controls;
  }

  public getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  getData() {
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
  getDataCategory() {
    this._categoryService.getCategoryRecords().subscribe(
      response => {        
          this.categoriesAllDataHeader = response;
          this.categoriesAllDataHeader.categories.push({id:222220,name:"All"})
        //}
      }
    );
    }
  ngOnInit() {
    this.router.events.subscribe((event:Event) => {
      if (event instanceof RoutesRecognized) {


       let cateIds = parseInt(event.state.root.firstChild?.params["categoryId"]);
       if(isNaN(cateIds)){
        this.catId = 0;
       } else {
        this.catId = event.state.root.firstChild?.params["categoryId"];
       }
      //console.log(this.catId,4132123132);

      let soundStatusCheck = localStorage.getItem("soundProp");
      if(soundStatusCheck ==null ||  soundStatusCheck ==undefined ||  soundStatusCheck == "" ||  soundStatusCheck == ""){
        this.playAudio();
        console.log("if"); 
        setTimeout(function(){   
          $("#checkkkd").prop('checked', true); 
        },800) 
      } else if( soundStatusCheck == "1" ) {
        this.playAudio();
        console.log("if");   
        setTimeout(function(){
          $("#checkkkd").prop('checked', true); 
        },800) 
      } else if( soundStatusCheck == "2" ) {
        this.pauseAudio();
        console.log("if");    
        setTimeout(function(){   
          $("#checkkkd").prop('checked', false); 
        },800) 
      }else {
        console.log("elsessss111");
        this.playAudio();
        //$("#offBtn").css("display", "block");
        //$("#onBtn").css("display", "none");
      }
      console.log(soundStatusCheck,"amnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      
    }
  });
    this.getData();  
    this.getDataCategory();  
    if (localStorage.getItem("guestUserName") === null) {
      //...
      //localStorage.setItem('guestUserName', "GuestUser");
      this.showModelPopup=true;
      this.openModelData();
    
    }

    this.showGuestUserName = localStorage.getItem("guestUserName");
   
    this.openModelData();
   
  }
  onChanges(e:any) {
    this.onReset();
   if(e.target.value ==  222220){
    this.router.navigate(['/categories']);  
   }else if(e.target.value ==  2000003){
    this.router.navigate(['/categories']);  
   }else{
    this.router.navigate(['/category-listing',e.target.value]);  
   }
   

  }
      get f(){
      
      return this.forms.controls;
      
      }

  public userFormSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false     
    this.submitted = true; 
    if(form.valid){
      if(form.value.name  == "" || form.value.name  == null){
       // localStorage.setItem('guestUserName', "GuestUser" );
        this.showGuestUserName = localStorage.getItem("guestUserName");      
      }else{
        localStorage.setItem('guestUserName',  form.value.name.trim());
        this.showGuestUserName = localStorage.getItem("guestUserName");      
      }
      this.hidePopup();
      this.onReset();
    }
    
    

  }
  onReset() {
    this.submitted = false;
    this.myForm.reset() 
}
  hidePopup(){
    jQuery(".popup-close").click();
  }
  
  openModelData() { 
    this.showGuestUserName = localStorage.getItem("guestUserName");      
    if(this.showGuestUserName == "" || this.showGuestUserName == null) {
      console.log("aya h");
      $('#raund-modaljohen').modal('show',{ backdrop: "static ", keyboard: false });
      //$("#raund-modal").modal();

    }    
  }
}
