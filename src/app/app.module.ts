import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CategoryComponent } from './category/category.component';
import {RouterModule} from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { VideosComponent } from './videos/videos.component';
import { VideosModule } from './videos/videos.module';
//import { VideoListingsComponent } from './video-listings/video-listings.component';

// import { NgImageSliderModule } from 'ng-image-slider';
//import { NgImageSliderModule } from 'ng-image-video-gallery';
//import { NgImageSliderModule } from '@zy2ba/ng-image-slider';

import { CarouselModule } from 'ngx-owl-carousel-o';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoAllComponent } from './video-all/video-all.component';
import { CategoryListingsComponent } from './category-listings/category-listings.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SearchComponent,
    PagenotfoundComponent,
    SocialLoginComponent,
    VideoAllComponent,
    CategoryListingsComponent,
    //VideosComponent,
   // VideoListingsComponent
  ],
  imports: [
    
    AppRoutingModule,
    RouterModule,
    BrowserModule,   
    LayoutModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
 //   NgImageSliderModule,
    VideosModule,
    BrowserAnimationsModule,
    CarouselModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
          //  provider: new GoogleLoginProvider('308041842089-utsn90t5mu6s442r7j7htpvbdbll5t18.apps.googleusercontent.com')
            provider: new GoogleLoginProvider('308041842089-utsn90t5mu6s442r7j7htpvbdbll5t18.apps.googleusercontent.com-1')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('503401308437913')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
