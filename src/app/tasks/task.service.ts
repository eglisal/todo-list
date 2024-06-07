import { Injectable } from '@angular/core';
import { NewTask } from './new-task.dto';
import { TaskItem } from './task-item.dto';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<TaskItem[]>([]);

  constructor() {
    // Inicialización si es necesario
  }

  getAllTasks(date: Date): Observable<TaskItem[]> {
    const tasksForDate = this.tasks.value.filter(task => task.date.toDateString() === date.toDateString());
    return new BehaviorSubject(tasksForDate).asObservable(); // Devolver un nuevo Observable con las tareas filtradas
  }

  addTask(date: Date, newTask: NewTask): void {
    const newTaskItem = new TaskItem(newTask.title, date);
    const updatedTasks = this.tasks.value.concat(newTaskItem);
    this.tasks.next(updatedTasks);
  }

  removeTask(date: Date, existingTask: TaskItem): void {
    const updatedTasks = this.tasks.value.filter(task => task !== existingTask);
    this.tasks.next(updatedTasks);
  }
}
