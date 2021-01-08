import { TestBed } from '@angular/core/testing';

import { AllTasksService } from './all-tasks.service';

describe('AllTasksService', () => {
  let service: AllTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
