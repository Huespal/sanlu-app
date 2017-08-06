import { TestBed, async } from '@angular/core/testing';

import { CardDialogComponent } from './cardDialog.component';

describe('CardDialogComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          CardDialogComponent
      ],
    }).compileComponents();
  }));

  it('should create the card dialog', async(() => {
    const fixture = TestBed.createComponent(CardDialogComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
