import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateaddComponent } from './candidateadd.component';

describe('CandidateaddComponent', () => {
  let component: CandidateaddComponent;
  let fixture: ComponentFixture<CandidateaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
