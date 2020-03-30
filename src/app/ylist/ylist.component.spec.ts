import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YlistComponent } from './ylist.component';

describe('YlistComponent', () => {
  let component: YlistComponent;
  let fixture: ComponentFixture<YlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
