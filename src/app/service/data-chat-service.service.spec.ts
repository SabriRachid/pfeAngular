import { TestBed, inject } from '@angular/core/testing';

import { DataChatServiceService } from './data-chat-service.service';

describe('DataChatServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataChatServiceService]
    });
  });

  it('should be created', inject([DataChatServiceService], (service: DataChatServiceService) => {
    expect(service).toBeTruthy();
  }));
});
