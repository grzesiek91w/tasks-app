import { Component, OnInit } from '@angular/core';
import { Task, TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {

  tasks: Task[] = [];

  newTask: Task = { id: 0, title: '', description: '' };

  editingTask: Task | null = null; // Track the task being edited

  constructor(private taskService: TodoService) {}


  ngOnInit(): void {

    this.loadTasks();

  }


  loadTasks(): void {

    this.taskService.getTasks().subscribe((data) => {

      this.tasks = data;
      console.log(this.tasks);

    });

  }


  addTask(): void {

    this.taskService.createTask(this.newTask).subscribe((task) => {

      this.tasks.push(task);

      this.resetNewTask();

    });

  }

  editTask(task: Task): void {

    this.editingTask = { ...task }; // Create a copy of the task to edit

  }


  // updateTask(task: Task): void {

  //   this.taskService.updateTask(task).subscribe(() => {

  //     this.loadTasks(); // Reload tasks to reflect updates

  //   });

  // }

  updateTask(): void {

    if (this.editingTask) {

      this.taskService.updateTask(this.editingTask).subscribe(() => {

        this.loadTasks(); // Reload tasks to reflect updates

        this.editingTask = null; // Clear the editing task

      });

    }

  }


  deleteTask(id: number): void {

    this.taskService.deleteTask(id).subscribe(() => {

      this.loadTasks(); // Reload tasks to reflect deletion

    });

  }

  resetNewTask(): void {

    this.newTask = { id: 0, title: '', description: '' };

  }
  
}
