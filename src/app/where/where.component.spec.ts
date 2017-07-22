import { TestBed, async } from '@angular/core/testing';

import { WhereComponent } from './where.component';

describe('WhereComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhereComponent
      ],
    }).compileComponents();
  }));

  it('should create the where', async(() => {
    const fixture = TestBed.createComponent(WhereComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
