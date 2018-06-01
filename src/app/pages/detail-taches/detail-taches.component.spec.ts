import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTachesComponent } from './detail-taches.component';

describe('DetailTachesComponent', () => {
  let component: DetailTachesComponent;
  let fixture: ComponentFixture<DetailTachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
