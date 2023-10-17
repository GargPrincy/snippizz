import { Component,NgZone } from '@angular/core';

import { VideoListingsService } from 'src/services/video-listings/video-listings.service';
import {Router, ActivatedRoute, NavigationEnd,Event, NavigationStart, NavigationError} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-video-all',
  templateUrl: './video-all.component.html',
  styleUrls: ['./video-all.component.css']
})
export class VideoAllComponent {
  form = new FormGroup({

    website: new FormControl('')

  });
  public loading:boolean = true;
  public pageType:number=0;
  public viewssSt:boolean=false;
  public atozSt:boolean=false;
  public showMore:any;
  public numberElements = 6;
  public numberViewed = 6;
  public currentPosition = 1;
  public categoriesAllDataVal:any = [];
  public searchWord: any = '';
  public imageObject:any;
  public showData = 0;
  public scrollSuccessfull = false; 
  public showKeyword:string = "";

  constructor(    
    private _videoListingService: VideoListingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private zone:NgZone,
    private readonly http: HttpClient,
    private titleService: Title
    ) {
    
     // this.loading =true;
     
      //this.apiData;
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {  }


        if (event instanceof NavigationEnd) {
          this.loading =true;
            // Hide loading indicator
          
            this.scrollSuccessfull = false;
     
        // Show loading indicator
      
          const userId:any = this.activatedRoute.snapshot.paramMap.get('videoSearchKey')?.toString();
          console.log("ayayayysaydyfs",userId);
          const searchKey =userId;
          this.searchWord = searchKey;
    // if (this.searchWord == 'top20s') {  
    //   this.showKeyword =  "Today's Top 20 Videos";
    //   this.categoriesAllDataVal.data = [];
    //   this.getTopVideo();
     


    // } else if(this.searchWord != ""){
    //   this.categoriesAllDataVal.data = [];
    //   this.getAllVideoListing(this.searchWord);
    //   this.showKeyword =  `Search Result's of  "${this.searchWord}"`;
    // }  
 
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
            console.log("aya3");
        }
    });


    
    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('videoSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      //console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.categoriesAllDataVal.data = [];
        this.titleService.setTitle("Today's Top 20 Videos");
        this.pageType = 1;

      } else if(this.searchWord != ""){
        this.categoriesAllDataVal.data = [];    
   
        
        if(myArray.length > 1){
          let text = myArray[1];
          //"topic&topic_ids=5297";
          const firstArr = text.split("&");
  
          //if(firstArr[0] == "topic"){
  
    
  
  
            if(firstArr[0] == "topic"){
             // console.log(firstArr[0],"myArraydddd");
              // let secondArray = firstArr[1].split("=");
              // console.log(secondArray,"secondARRR")
  
            // this.showKeyword  = this.searchWord;
            // this.titleService.setTitle(this.showKeyword);
            this.pageType = 2;
  
  
          }
          else{
            this.showKeyword =  `Search Results of  "${this.searchWord}"`;
            this.titleService.setTitle(this.showKeyword);
            this.pageType = 3;
  
          }     
          

        }
        else{
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);
          this.pageType = 3;

        }   

      } 
    });

  
      this.imageObject = [];
      // this.initSlider();
      // jQuery(window).resize(this.initResponsive);
      // jQuery("#galleries-list .slide-left").click(this.slideLeft);
      // jQuery("#galleries-list .slide-right").click(this.slideRight);
    
    
  
      setTimeout(()=>{    
        this.loading = false;
      },1400);
    }

    ngAfterViewInit() {
      
      setTimeout(()=>{    
        this.loading = false;
      },1600);
     
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
      console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.showKeyword =  "Today's Top 20 Videos";

        this.categoriesAllDataVal.data = [];
        this.getTopVideo();
    
      } else if(this.searchWord != ""){



  
        this.categoriesAllDataVal.data = [];


        if(myArray.length > 1){
          let text = myArray[1];
          //"topic&topic_ids=5297";
          const firstArr = text.split("&");
  
     
  
          if(firstArr[0] == "topic"){
            console.log(firstArr[0],"ffdsfsdfdsfsd");
  
            let secondArray = firstArr[1].split("=");
            console.log(secondArray,"secondARRR")
  
            this.getAllVideoListing(secondArray[1]);
  
            // this.showKeyword =  this.searchWord;
            // this.titleService.setTitle(this.showKeyword);
  
          }
          else{
            this.getAllVideoListing(this.searchWord);
            this.showKeyword =  `Search Results of  "${this.searchWord}"`;
            this.titleService.setTitle(this.showKeyword);
          }    
        }    else{
          this.getAllVideoListing(this.searchWord);
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);
        }   

       

      } 
    });
   
  
   }
   get f(){

    return this.form.controls;
  
  }
  
    videoSort(){  
      console.log("i am in");
      this.showData = 1;
      let vidData = JSON.parse(JSON.stringify(this.categoriesAllDataVal.data));
      this.categoriesAllDataVal.data = [];
  
      this.categoriesAllDataVal.data = vidData.sort(function (a:any, b:any) {
        return b.view_count - a.view_count;
      });
    
      
      setTimeout(()=>{    
        this.loading = false;
      },100);
  
    
    }
    videoSortAlpha(){  
      console.log("i am in");
      this.showData = 1;
      let vidData = JSON.parse(JSON.stringify(this.categoriesAllDataVal.data));
      this.categoriesAllDataVal.data = [];
  
      this.categoriesAllDataVal.data = vidData.sort(function(a:any, b:any){
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

    onChanges(e:any) {
      if(e.target.value == "viewss"){
        this.videoSort();
      }else     if(e.target.value  == "atoz"){
        this.videoSortAlpha();
      }

      console.log(e.target.value);


}
 
   private getData() {
     this._videoListingService.getCategoryRecords().subscribe(
       response => {
         console.log("get data",response)
        // if (response.body?.isSuccess) {
           this.categoriesAllDataVal.data = response.data;
           this.showData = 1;
         //  this.subContent = response.info?.content
          // this.users = response.body?.data?.data ?? [];
    
         //}
       }
     );
   }
   private getAllVideoListing(searchKeyword:string) {
    this.categoriesAllDataVal.data = [];
    //pageType
    //getVideoRecordsViewAllForTopic

    if(this.pageType == 2){
      this._videoListingService.getVideoRecordsViewAllForTopic(searchKeyword).subscribe(
        responses=> {
          this.showKeyword =  responses.data[0].topic;
          this.titleService.setTitle(responses.data[0].topic);
          //this.categoriesAllDataVal.data = [];
  
      // if (response.body?.isSuccess) {
        //this.zone.run(() => { // <== added
        this.showMore =true;
          console.log("203111",responses)
          this.categoriesAllDataVal.data = [...this.categoriesAllDataVal.data ,...responses.data];
          //this.categoriesAllDataVal.data.push(response.data);
          this.categoriesAllDataVal.allData = responses;
          console.log("205111",this.categoriesAllDataVal.data )
          console.log("99999999999999",this.categoriesAllDataVal.allData )
          this.showData = 1;
       // });
       if(responses.total.current_page == responses.total.last_page){
        this.showMore =false;
       }
     }
        ,
        error => {
          this.categoriesAllDataVal.data = [];
          console.log("226",this.categoriesAllDataVal )
          this.showData = 0; 
             },
      );
    }else{
    this._videoListingService.getVideoRecordsViewAll(searchKeyword).subscribe(
      responses=> {
        //this.categoriesAllDataVal.data = [];

    // if (response.body?.isSuccess) {
      //this.zone.run(() => { // <== added
      this.showMore =true;
        console.log("203111",responses)
        this.categoriesAllDataVal.data = [...this.categoriesAllDataVal.data ,...responses.data];
        //this.categoriesAllDataVal.data.push(response.data);
        this.categoriesAllDataVal.allData = responses;
        console.log("205111",this.categoriesAllDataVal.data )
        console.log("99999999999999",this.categoriesAllDataVal.allData )
        this.showData = 1;
     // });
     if(responses.total.current_page == responses.total.last_page){
      this.showMore =false;
     }
   }
      ,
      error => {
        this.categoriesAllDataVal.data = [];
        console.log("226",this.categoriesAllDataVal )
        this.showData = 0; 
           },
    );
  }
  }
  showMoreItems(passVal=0){
    if(passVal == 1){

  
    console.log(300000000,this.categoriesAllDataVal.allData);

    
    this._videoListingService.getVideoRecordsViewAllPagination(this.categoriesAllDataVal.allData.total.next_page_url).subscribe(
      response => {

          // if (response.body?.isSuccess) {
            //this.zone.run(() => { // <== added
     
              console.log("203",response)
              this.categoriesAllDataVal.data = [...this.categoriesAllDataVal.data ,...response.data];
              //this.categoriesAllDataVal.data.push(response.data);
              this.categoriesAllDataVal.allData = response;
              console.log("205",this.categoriesAllDataVal.data )
              this.showData = 1;
           // });
           if(response.total.current_page == response.total.last_page){
            this.showMore =false;
           }
      }
      ,
      error => {
        this.categoriesAllDataVal.data = [];
        console.log("226",this.categoriesAllDataVal )
        this.showData = 0; 
        this.showMore =false;
           },
    );
  }
  }

  private getTopVideo() {
   
    this._videoListingService.getTopVideoRecordAll().subscribe(
      response => {
            //this.categoriesAllDataVal.data = [];

        // if (response.body?.isSuccess) {
          //this.zone.run(() => { // <== added
   
            console.log("2031",response)
            this.categoriesAllDataVal.data = [...this.categoriesAllDataVal.data ,...response.data];
            //this.categoriesAllDataVal.data.push(response.data);
            this.categoriesAllDataVal.allData = response;
            console.log("2051",this.categoriesAllDataVal.data )
            this.showData = 1;
            this.showMore =true;
         // });
         if(response.total.current_page == response.total.last_page){
          this.showMore =false;
         }
    }
    );
  }

  onChangess(param:string, ids:string) {
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
