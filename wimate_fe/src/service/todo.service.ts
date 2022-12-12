import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODO } from 'src/assets/interfaces/todoInterface';

const BASEURL='http://localhost:8081/api'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _addTodo = `${BASEURL}/addTodo`
  private _getTodo = `${BASEURL}/getTodos`
  private _updateTodo = `${BASEURL}/updateTodo`
  private _deleteTodo = `${BASEURL}/deleteTodo`
  constructor(private http:HttpClient) { }


   postTodo(details:TODO) {
     return this.http.post(this._addTodo,details)
}

    getTodo() {
    return this.http.get(this._getTodo)
  }
  updateTodo(id:String) {
    return this.http.get(`${this._updateTodo}/${id}`)

  }
  deleteTodo(id:String) {
    return this.http.delete(`${this._deleteTodo}/${id}`)

  }


}
