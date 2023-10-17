import { Component,NgZone } from '@angular/core';
import { VideoListingsService } from 'src/services/video-listings/video-listings.service';
import {Router, ActivatedRoute, NavigationEnd,Event, NavigationStart, NavigationError} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Title } from '@angular/platform-browser';

import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';


export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-video-listings',
  templateUrl: './video-listings.component.html',
  styleUrls: ['./video-listings.component.css']
})
export class VideoListingsComponent {
  form = new FormGroup({

    website: new FormControl('')

  });

  public viewssSt:boolean=false;
  public atozSt:boolean=false;
  public currentIdTopic="";
  apiData: any;
  totalCount:number = 0;
  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin: 20,    items:5,  slideBy:4,     dots:false,    autoWidth:false,    autoHeight:false,       slideTransition:'linear',
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', animateIn: 'fadeIn', navSpeed:100,
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true,
    stagePadding:1
  };
  public pageType:number=0;
  public loading:boolean = true;
  public categoriesAllData:any=[];
  public searchWord: any = '';  
  public showData = 0;
  public scrollSuccessfull = false; 
  public showKeyword:string = "";
  public urlHolderQueryParams:string="";
  public topicKeyword:boolean=false;
  public topicPoint:boolean=false;

  constructor(    
    private _videoListingService: VideoListingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone:NgZone,
    private readonly http: HttpClient,
    private titleService: Title
    ) {
  
 

      this.searchWord="";
      this.topicKeyword = false;
      //console.log("listing component");
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          console.log("listing component");
        }
        if (event instanceof NavigationEnd) {
          this.loading =true;
          this.topicKeyword = false;

          this.scrollSuccessfull = false;    
        // Show loading indicator
      
          const userId:any = this.activatedRoute.snapshot.paramMap.get('videoSearchKey')?.toString();
          console.log("ayayayysaydyfs",userId);
          const searchKey =userId;
          this.searchWord = searchKey;
          if (this.searchWord == 'top20s') {              
            this.pageType = 1;
            this.totalCount = 20;
            this.showKeyword =  "Today's Top 20 Videos";
            this.categoriesAllData = [];
            this.titleService.setTitle("Today's Top 20 Videos");
            this.getTopVideo();
          } else if(this.searchWord != ""){

            //aman

       this.categoriesAllData.data = [];     
       
       //aman
       const myArray = userId.split("?");
    
       const searchKey =userId;
       this.searchWord = myArray[0];



       console.log("ayaaaaaaaaaaaaaaaaaaaaah",myArray);

       if(myArray.length > 1){
        let text = myArray[1];
        //"topic&topic_ids=5297";
        const firstArr = text.split("&");

  

        if(firstArr[0] == "topic"){
         //
       
          this.pageType = 2;
          console.log(firstArr[0],"ffdsfsdfdsfsd");

          let secondArray = firstArr[1].split("=");
          this.urlHolderQueryParams = this.searchWord+"?topic";
          //this.showKeyword  = this.searchWord;
          this.topicKeyword = true;
          //this.titleService.setTitle(this.showKeyword);

       
          console.log(secondArray[1],"secondArray");
          this.getAllVideoListing(secondArray[1]);
       
          this.topicPoint = true;
       
        
       
        

        }
        else{
          this.categoriesAllData= [];
          this.getAllVideoListing(this.searchWord);
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);
          this.pageType = 3;

        }    
      }    else{
       // console.log(3)
       this.categoriesAllData= [];
       this.getAllVideoListing(this.searchWord);
       this.showKeyword =  `Search Results of  "${this.searchWord}"`;
       this.titleService.setTitle(this.showKeyword);
       this.pageType = 3;

      }  


//aman






        // if(myArray[1] == "topic"){
        //   this.urlHolderQueryParams = this.searchWord+"?topic";
        //   this.showKeyword  = this.searchWord;
        //   this.topicKeyword = true;
        //   this.titleService.setTitle(this.showKeyword);
        // }
        // else{
        //   this.showKeyword =  `Search Results of  "${this.searchWord}"`;
        //   this.titleService.setTitle(this.showKeyword);
        // }     

      
          //aman






            








        

          }  
          this.urlHolderQueryParams = this.searchWord; 
        }

        if (event instanceof NavigationError) { }
    });







    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('videoSearchKey')?.toString();
  
     

  
      const myArray = userId.split("?");
      //console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        //this.categoriesAllData.data = [];
      } else if(this.searchWord != ""){
      
       this.categoriesAllData.data = [];       
       
       //aman
       if(myArray.length > 1){
        let text = myArray[1];
        //"topic&topic_ids=5297";
        const firstArr = text.split("&");

   

        if(firstArr[0] == "topic"){
          console.log(1111111111111111111111111111)
          this.pageType = 2;
          console.log(firstArr[0],"ffdsfsdfdsfsd");

          let secondArray = firstArr[1].split("=");
          this.urlHolderQueryParams = this.searchWord+"?topic";
          //this.showKeyword  = this.searchWord;
          this.topicKeyword = true;
          //this.titleService.setTitle(this.showKeyword);

       
          this.getAllVideoListing(secondArray[1]);
       
          this.topicPoint = true;
       
        
       
        

        }
        else{
          console.log(2222222222222222222)
          this.pageType = 3;
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);

          this.getAllVideoListing(this.searchWord);
    
          this.topicPoint = false;





        }    
      }    else{
       // console.log(3)
        this.pageType = 3;
        this.showKeyword =  `Search Results of  "${this.searchWord}"`;
        this.titleService.setTitle(this.showKeyword);
        
        this.getAllVideoListing(this.searchWord);
    
        this.topicPoint = false;

      }  


//aman






        // if(myArray[1] == "topic"){
        //   this.urlHolderQueryParams = this.searchWord+"?topic";
        //   this.showKeyword  = this.searchWord;
        //   this.topicKeyword = true;
        //   this.titleService.setTitle(this.showKeyword);
        // }
        // else{
        //   this.showKeyword =  `Search Results of  "${this.searchWord}"`;
        //   this.titleService.setTitle(this.showKeyword);
        // }     

      } 
    });


      setTimeout(()=>{    
        this.loading = false;
      },1000);
    }

    ngOnChanges()	{      
      console.log("state changesssss");     
      //We loading the player script on after view is loaded
    }

    ngAfterViewInit() {
      
      setTimeout(()=>{    
        this.loading = false;
      },1000);
   
     
      //We loading the player script on after view is loaded
    }
    ngAfterViewChecked() {
      if (!this.scrollSuccessfull) {
      
      setTimeout(()=>{    
        this.loading = false;
      },1600);

    }
     
      //We loading the player script on after view is loaded
    }


  ngOnInit() {
       this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('videoSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      //console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.categoriesAllData.data = [];
        this.getTopVideo();
    
        this.topicPoint = false;
        this.pageType =3
       
      } else if(this.searchWord != ""){

        this.categoriesAllData.data = [];
  

        if(myArray.length > 1){
          let text = myArray[1];
          //"topic&topic_ids=5297";
          const firstArr = text.split("&");
  
          
  
          if(firstArr[0] == "topic"){
            let secondArray = firstArr[1].split("=");
            this.getAllVideoListing(secondArray[1]);
            this.pageType =2;
            this.topicPoint = true;
         
            // this.showKeyword =  this.searchWord;
            this.topicKeyword = true;
            // this.titleService.setTitle(this.showKeyword);

  
          }
          else{
            this.getAllVideoListing(this.searchWord);
            this.pageType =3;
            this.topicPoint = false;
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);
          }    
        }    else{
          this.getAllVideoListing(this.searchWord);
          this.pageType =3;
          this.topicPoint = false;
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);
        }  
  











        // if(myArray[1] == "topic"){
        //   this.topicPoint = true;
         
        //   this.showKeyword =  this.searchWord;
        //   this.topicKeyword = true;
        //   this.titleService.setTitle(this.showKeyword);

        // }
        // else{
        //   this.topicPoint = false;
        //   this.showKeyword =  `Search Results of  "${this.searchWord}"`;
        //   this.titleService.setTitle(this.showKeyword);

        // }     

      } 
    });
   
  
   }

 
   private getData() {
     this._videoListingService.getCategoryRecords().subscribe(
       response => {
         console.log("get data",response)
        // if (response.body?.isSuccess) {
           this.categoriesAllData.data = response;
           this.showData = 1;
         //  this.subContent = response.info?.content
          // this.users = response.body?.data?.data ?? [];
    
         //}
       }
     );
   }
   private getAllVideoListing(searchKeyword:string) {
    console.log(this.pageType,"jojojo")
 
    this.categoriesAllData.data = [];

    
    if(this.pageType == 2){
      console.log(this.pageType,"jojojo", searchKeyword)
      this._videoListingService.getVideoRecordsViewAllForTopic(searchKeyword).subscribe(
        responses=> {  console.log("203",responses)
        let a = responses;
        let b=a?.data;
        this.categoriesAllData.data = responses.data;
        this.totalCount = responses.total.total;
        console.log("1811111111111111",this.categoriesAllData.data)
        
        this.showData = 1;
        this.showKeyword =  responses.data[0].topic;
        this.titleService.setTitle(responses.data[0].topic);
       }
        ,
        error => {
          this.categoriesAllData.data = [];
          console.log("187",this.categoriesAllData.data )
          this.showData = 0; 
             },
      );
    }else{
      //console.log(this.pageType,"momomo" )
    this._videoListingService.getVideoRecords(searchKeyword).subscribe(
      response => {

          // if (response.body?.isSuccess) {
            //this.zone.run(() => { // <== added
     
              console.log("203",response)
              let a = response;
              let b=a?.data;
              this.categoriesAllData.data = response.data;
              this.totalCount = response.total.total;
              this.showData = 1;
              console.log("1811111111111111",this.categoriesAllData.data)
              if(this.categoriesAllData.data.length == 0){
                this.showData = 0; 
                this.loading = false;
              }
              
            
           // });
      }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("187",this.categoriesAllData.data )
        this.showData = 0; 
        this.loading = false;
           },
    );
  }
  }
  videoAll(){
    //                              routerLink="/video-all/{{ slide.topic_name }}?topic&topic_ids={{ slide.topic_id }}"
    if(this.topicPoint == true){

      console.log(this.categoriesAllData.data[0].topic_id,"amnaaaaaaaaaaaaaaaaaa");
      //  routerLink="/video-all/{{ slide.topic_name }}?topic&topic_ids={{ slide.topic_id }}"

      this.urlHolderQueryParams = this.searchWord+"?topic&topic_ids="+this.categoriesAllData.data[0].topic_id+"";
      this.router.navigate(['/video-all',this.urlHolderQueryParams]);
    }else{
      this.router.navigate(['/video-all',this.urlHolderQueryParams]);
    }

 
  }
  private getTopVideo() {
    this._videoListingService.getTopVideoRecord().subscribe(
      response => {   
            
          this.categoriesAllData.data = response.data;  
          console.log(197,response);
          
          
      
          this.showData = 1;
      }
    );
  }
  onChanges(e:any) {
      if(e.target.value == "viewss"){
        this.videoSort();
      }else     if(e.target.value  == "atoz"){
        this.videoSortAlpha();
      }

      console.log(e.target.value);


}

get f(){

  return this.form.controls;

}

  videoSort(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function (a:any, b:any) {
      return b.view_count - a.view_count;
    });
  
    
    setTimeout(()=>{    
      this.loading = false;
    },100);

  
  }
  videoSortAlpha(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function(a:any, b:any){
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
  
    
    setTimeout(()=>{    
      this.loading = false;
    },100);

  
  }

  onChangess(param:string,ids:string) {
    if(param== "viewss"){
      this.viewssSt=true;
      this.atozSt=false;
      this.videoSort();
    }else     if(param  == "atoz"){
      this.atozSt=true;
      this.viewssSt=false;
      this.videoSortAlpha();
    }
    this.sort(ids);
   // this.currentIdTopic =ids;

  
    //  console.log(e.target.value);
  
  
  }
  
   sort(ids:string) {
    var x:any= document.getElementById(ids);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

      
  
}



