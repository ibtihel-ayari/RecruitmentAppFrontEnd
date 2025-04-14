import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationbycandidateComponent } from './applicationbycandidate.component';

describe('ApplicationbycandidateComponent', () => {
  let component: ApplicationbycandidateComponent;
  let fixture: ComponentFixture<ApplicationbycandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationbycandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationbycandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
