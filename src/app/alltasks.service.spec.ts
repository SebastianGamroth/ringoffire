import { TestBed } from '@angular/core/testing';

import { AlltasksService } from './alltasks.service';

describe('AlltasksService', () => {
  let service: AlltasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlltasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
