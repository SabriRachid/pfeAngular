import { TestBed, inject } from '@angular/core/testing';

import { AttachementServiceService } from './attachement-service.service';

describe('AttachementServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachementServiceService]
    });
  });

  it('should be created', inject([AttachementServiceService], (service: AttachementServiceService) => {
    expect(service).toBeTruthy();
  }));
});
