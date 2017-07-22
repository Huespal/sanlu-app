import { TestBed, async } from '@angular/core/testing';

import { WhatComponent } from './what.component';

describe('WhatComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WhatComponent
      ],
    }).compileComponents();
  }));

  it('should create the what', async(() => {
    const fixture = TestBed.createComponent(WhatComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
