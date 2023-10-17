import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoListingsRoutingModule } from './video-listings-routing.module';
import { VideoListingsComponent } from './video-listings.component';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [VideoListingsComponent],
  imports: [
    CommonModule,
    VideoListingsRoutingModule,
    CarouselModule,
    ReactiveFormsModule
  ]
})
export class VideoListingsModule { }
