import { TestBed, async } from '@angular/core/testing';

import { WhoComponent } from './who.component';

describe('WhoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhoComponent
      ],
    }).compileComponents();
  }));

  it('should create the who', async(() => {
    const fixture = TestBed.createComponent(WhoComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
