import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationtopComponent } from './applicationtop.component';

describe('ApplicationtopComponent', () => {
  let component: ApplicationtopComponent;
  let fixture: ComponentFixture<ApplicationtopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationtopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationtopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
