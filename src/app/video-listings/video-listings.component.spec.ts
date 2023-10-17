import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListingsComponent } from './video-listings.component';

describe('VideoListingsComponent', () => {
  let component: VideoListingsComponent;
  let fixture: ComponentFixture<VideoListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
