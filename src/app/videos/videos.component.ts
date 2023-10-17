import { Component } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { VideoListingsService } from 'src/services/video-listings/video-listings.service';
import { NgImageSliderModule } from 'ng-image-video-gallery';
import { VideosModule } from './videos.module';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  
  public imageObject:any;
  public videoData:any = [];
  public videoId:string="";
  public videoTableId:any;
  public videoClicked = 2;
  public videoEmbed:string = "";
  constructor(    
      private activatedRoute: ActivatedRoute,
      private _videoListingService: VideoListingsService,
      private titleService: Title
      
    ) {
      this.imageObject = [];
    }

    ngOnInit() {
      [].slice.call(document.querySelectorAll('video')).forEach(function(audio:any) {
        audio.muted = true;
    });
      this.activatedRoute.queryParams.subscribe(params => {
        const videoId = params['videoParamId'];
        const id = this.activatedRoute.snapshot.paramMap.get('videoParamId');
        const userId:any = this.activatedRoute.snapshot.paramMap.get('videoParamId')?.toString();


        console.log(params,userId,id);
        let videoIds:number = parseInt(userId)
        this.getData(videoIds);
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        
        
      });
  
     //
      
    
     }

    public shareVideoCopytext(textShare:any){


    


      let copyText:any = document.getElementById('ytbUrl');
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
      // alert(copyText.value)
      navigator.clipboard.writeText(copyText.value);




    }
    public embedVideoCopytext(textShare:any){

      let custTooltop:any = document.getElementById("custom-tooltip");
      custTooltop.style.display = "inline";
      
      setTimeout( function() {
        let custTooltopt:any = document.getElementById("custom-tooltip");
        custTooltopt.style.display = "none";
        //  document.getElementById("custom-tooltip").style.display = "none";
      }, 1000);



      let copyText:any = document.getElementById('embedUrl');
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
      // alert(copyText.value)
      navigator.clipboard.writeText(copyText.value);
    }
    public missingVideoReport(videoId:any){
       console.log(videoId,"div id");   
      this._videoListingService.reportVideoMissing(videoId).subscribe(
        response => {
          console.log("get data",response)
         // if (response.body?.isSuccess) {
              //this.videoData = response;
           
          //  this.subContent = response.info?.content
           // this.users = response.body?.data?.data ?? [];
     
          //}
        }
      );
     
    }
    
    private getData(videoId:number) {
  
      
      this._videoListingService.getVideoRecord(videoId).subscribe(
        response => {
        
              this.videoData = response[0];
              this.titleService.setTitle(this.videoData.title.toUpperCase());

              //this.videoEmbed =this.videoData.url;
              this.videoId = this.youtube_parser(this.videoData.url);
              if(this.videoData.type == 'media'){
                this.videoEmbed ="<iframe class='videoEmbedCss' width='420' height='345' src='"+this.videoData.url+"'></iframe>";

              }else{
                this.videoEmbed =`<iframe class='videoEmbedCss' width='420' height='345' src='https://www.youtube.com/embed/${this.videoId}'></iframe>`;
              }
              
             

            }
      );
    }
    youtube_parser(url:any){
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return (match&&match[7].length==11)? match[7] : false;
  }
  toggleVideo(videoId:number) {
  //  console.log("get data dfdsfd",videoId)
  
       // console.log("get data",response)
        if(this.videoClicked == 2){
          this._videoListingService.updateVideoViewCount(videoId).subscribe(
            response => {  
              this.videoData.view_count = parseInt(this.videoData.view_count)+1;
              this.videoClicked = 1;
            });
        }
        
       // if (response.body?.isSuccess) {
           
        //  this.subContent = response.info?.content
         // this.users = response.body?.data?.data ?? [];
   
        //}
     
  }
  
    makeBig() {
      var myVideo: any = document.getElementById("my_video_1");
      myVideo.width = 560;
    }
  
    makeSmall() {
      var myVideo: any = document.getElementById("my_video_1");
      myVideo.width = 320;
    }
  
    makeNormal() {
      var myVideo: any = document.getElementById("my_video_1");
      myVideo.width = 420;
    }
  
    skip(value:any) {
      let video: any = document.getElementById("my_video_1");
      video.currentTime += value;
    }
  
    restart() {
      let video: any = document.getElementById("my_video_1");
      video.currentTime = 0;
    }
    
}
