import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import { TaskItem } from './task-item.dto';
import { NewTask } from './new-task.dto';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<TaskItem[]> = new Observable<TaskItem[]>(); // Inicializar la propiedad
  newTask: NewTask = new NewTask('', new Date());
  selectedDate: Date = new Date();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasksForDate(this.selectedDate);
  }

  loadTasksForDate(date: Date): void {
    this.tasks$ = this.taskService.getAllTasks(date);
  }

  onDateChange(event: any): void {
    const selectedDate = event?.target?.value;
    if (selectedDate) {
      this.selectedDate = new Date(selectedDate);
      this.loadTasksForDate(this.selectedDate);
    }
  }

  addTask(form: any): void {
    if (form.valid) {
      this.taskService.addTask(this.newTask.date, this.newTask);
      this.loadTasksForDate(this.newTask.date); // Actualizar la lista de tareas después de agregar una nueva tarea
      this.newTask = new NewTask('', new Date()); // Reiniciar el formulario
      form.resetForm(); // Reiniciar el estado del formulario
    }
  }

  removeTask(task: TaskItem): void {
    this.taskService.removeTask(task.date, task);
    this.loadTasksForDate(task.date); // Actualizar la lista de tareas después de eliminar una tarea
  }
}
