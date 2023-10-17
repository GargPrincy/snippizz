import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { HomeModule } from './home/home.module';
import { VideoListingsComponent } from './video-listings/video-listings.component';
import { VideosComponent } from './videos/videos.component';
import { VideoListingsModule } from './video-listings/video-listings.module';
import { VideoAllComponent } from './video-all/video-all.component';
import { CategoryListingsComponent } from './category-listings/category-listings.component';


const routes: Routes = [

  {
    path: "",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'categories', component: CategoryComponent },
  
  { path: 'category-listing/:categoryId', component: CategoryListingsComponent },
  {
    path: "video-listings/:videoSearchKey",
    component: VideoListingsComponent 
  },
  {
    path: "video-listings",
    component: VideoListingsComponent 
  },
  {
    path: "video-all/:videoSearchKey",
    component: VideoAllComponent 
  },
  {
    path: "video-all",
    component: VideoAllComponent 
  },
  {
    path: "video/:videoParamId",component: VideosComponent 
  },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: SocialLoginComponent },
  { path: '**', pathMatch: 'full',component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
