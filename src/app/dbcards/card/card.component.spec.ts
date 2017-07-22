import { TestBed, async } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent
      ],
    }).compileComponents();
  }));

  it('should create the db card', async(() => {
    const fixture = TestBed.createComponent(CardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
