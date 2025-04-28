import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardrhComponent } from './dashboardrh.component';

describe('DashboardrhComponent', () => {
  let component: DashboardrhComponent;
  let fixture: ComponentFixture<DashboardrhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardrhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardrhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
