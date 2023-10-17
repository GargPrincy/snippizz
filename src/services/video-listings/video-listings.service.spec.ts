import { TestBed } from '@angular/core/testing';

import { VideoListingsService } from './video-listings.service';

describe('VideoListingsService', () => {
  let service: VideoListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
