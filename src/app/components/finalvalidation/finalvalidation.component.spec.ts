import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalvalidationComponent } from './finalvalidation.component';

describe('FinalvalidationComponent', () => {
  let component: FinalvalidationComponent;
  let fixture: ComponentFixture<FinalvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalvalidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
