import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternofferComponent } from './internoffer.component';

describe('InternofferComponent', () => {
  let component: InternofferComponent;
  let fixture: ComponentFixture<InternofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternofferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
