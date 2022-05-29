import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoService } from '../toto.service';
import { Todo } from '../toto.model';
// Ngrx Store
import * as fromTodoReducers from '../todo.reducer';
import * as fromTodoActions from '../todo.action';
import * as fromTodoSelectors from '../todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todo$: Observable<Todo[]>;
  count$: Observable<number>;

  isEdit = false;
  name: string;
  selectedTodo: Todo;

  constructor(
    private todoService: TodoService,
    private store: Store<{ todo: fromTodoReducers.State }>
  ) {
    this.todo$ = store.pipe(select(fromTodoSelectors.selectAll));
    this.count$ = store.pipe(select(fromTodoSelectors.selectTotalLength));
  }

  // Add Todo
  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.store.dispatch(new fromTodoActions.AddTodo(todo));
    this.name = '';
  }

  // Update Todo
  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    this.store.dispatch(new fromTodoActions.UpdateTodo(this.selectedTodo));
    this.isEdit = false;
    this.name = '';
  }

  // Delete Todo
  deleteTodo(todo: Todo): void {
    this.store.dispatch(new fromTodoActions.DeleteTodo(todo.id));
  }
}