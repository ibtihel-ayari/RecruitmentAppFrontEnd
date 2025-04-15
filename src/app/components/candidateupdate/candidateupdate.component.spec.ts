import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateupdateComponent } from './candidateupdate.component';

describe('CandidateupdateComponent', () => {
  let component: CandidateupdateComponent;
  let fixture: ComponentFixture<CandidateupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
