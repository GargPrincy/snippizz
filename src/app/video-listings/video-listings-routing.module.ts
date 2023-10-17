import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListingsComponent } from './video-listings.component';

const routes: Routes = [
  {
    path: 'video-listings/:videoSearchKey',
    component: VideoListingsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoListingsRoutingModule { }
