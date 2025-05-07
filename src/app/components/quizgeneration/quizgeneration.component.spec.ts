import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizgenerationComponent } from './quizgeneration.component';

describe('QuizgenerationComponent', () => {
  let component: QuizgenerationComponent;
  let fixture: ComponentFixture<QuizgenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizgenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
