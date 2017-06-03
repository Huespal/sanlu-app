import { TestBed, async } from '@angular/core/testing';

import { WhyComponent } from './why.component';

describe('WhyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhyComponent
      ],
    }).compileComponents();
  }));

  it('should create the whhy', async(() => {
    const fixture = TestBed.createComponent(WhyComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
