import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAllComponent } from './video-all.component';

describe('VideoAllComponent', () => {
  let component: VideoAllComponent;
  let fixture: ComponentFixture<VideoAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
