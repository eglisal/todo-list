import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TaskItem } from './task-item.dto'; // Asegúrate de importar TaskItem

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty list of tasks initially', () => {
    expect(component.tasks$).toBeDefined();

    component.loadTasksForDate(new Date());

    component.tasks$.subscribe(tasks => {
      expect(tasks).toEqual([]);
    });
  });

  it('should display error message when task title is less than 4 characters', () => {
    const inputElement = fixture.debugElement.query(By.css('input[name="taskTitle"]')).nativeElement;
    inputElement.value = 'abc';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.validation-error')).nativeElement;
    expect(errorMessage.textContent).toContain('Task title must at least have 4 characters.');
  });

  it('should not display error message when task title is 4 characters or more', () => {
    const inputElement = fixture.debugElement.query(By.css('input[name="taskTitle"]')).nativeElement;
    inputElement.value = 'abcd';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.validation-error'));
    expect(errorMessage).toBeNull();
  });

});
