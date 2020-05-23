import { TestBed } from '@angular/core/testing';

import { ChatWithTokenService } from './chat-with-token.service';

describe('ChatWithTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatWithTokenService = TestBed.get(ChatWithTokenService);
    expect(service).toBeTruthy();
  });
});
