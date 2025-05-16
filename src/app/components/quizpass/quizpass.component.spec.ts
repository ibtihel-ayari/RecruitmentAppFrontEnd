import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizpassComponent } from './quizpass.component';

describe('QuizpassComponent', () => {
  let component: QuizpassComponent;
  let fixture: ComponentFixture<QuizpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizpassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
