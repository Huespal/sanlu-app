import { TestBed, async } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmComponent
      ],
    }).compileComponents();
  }));

  it('should create the confirm dialog', async(() => {
    const fixture = TestBed.createComponent(ConfirmComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
