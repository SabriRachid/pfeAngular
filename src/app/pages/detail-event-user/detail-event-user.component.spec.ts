import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventUserComponent } from './detail-event-user.component';

describe('DetailEventUserComponent', () => {
  let component: DetailEventUserComponent;
  let fixture: ComponentFixture<DetailEventUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEventUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEventUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
