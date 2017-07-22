import { TestBed, async } from '@angular/core/testing';

import { DbCardsComponent } from './dbcards.component';

describe('DbCardsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DbCardsComponent
      ],
    }).compileComponents();
  }));

  it('should create the dbcards', async(() => {
    const fixture = TestBed.createComponent(DbCardsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
