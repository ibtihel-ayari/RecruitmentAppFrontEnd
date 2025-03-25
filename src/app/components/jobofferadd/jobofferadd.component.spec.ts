import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofferaddComponent } from './jobofferadd.component';

describe('JobofferaddComponent', () => {
  let component: JobofferaddComponent;
  let fixture: ComponentFixture<JobofferaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobofferaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobofferaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
