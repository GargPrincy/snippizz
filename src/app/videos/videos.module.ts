import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';

import {YouTubePlayerModule} from '@angular/youtube-player';
import { VideosComponent } from './videos.component';
import { NgImageSliderModule } from 'ng-image-video-gallery';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    VideosRoutingModule,
    NgImageSliderModule
 
  ]
})
export class VideosModule { }
