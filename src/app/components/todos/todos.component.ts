import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
  inputTodo:string = "";
  todoValidation:boolean = true;
  storedTodos!: Todo[];

  constructor() { }

  ngOnInit(): void {

    let localTodo = localStorage.getItem('todos')

    localTodo ? this.todos = JSON.parse(localTodo as string) : this.todos = []

  }

  toggleDone(id:number) {
    this.todos.map((v, i) => {
      if (i === id) {
        v.completed = !v.completed;
      }
      return v;
    })
    this.updateTodos()
  }

  deleteTodo(id:number) {
    this.todos = this.todos.filter((v,i) => i !== id);
    this.updateTodos()
  }

  addTodo() {
    if (this.inputTodo === "") {
      this.todoValidation = false
      return
    }
    this.todoValidation = true

    this.todos.push({
      content: this.inputTodo,
      completed: false
    });

    this.updateTodos()

    this.inputTodo = "";


  }

  updateTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
    console.log(localStorage.getItem('todos'));
    
  }

}
