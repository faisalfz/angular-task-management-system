import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postTask(taskDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/task', taskDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllTasks(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/tasks', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateTask(id: number, taskDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/task/${id}`, taskDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteTask(id: number,): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  searchTasks(title: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/tasks/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/users`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  createComment(taskId: number, content: string): Observable<any> {
    const params = {
      taskId: taskId,
      postedBy: StorageService.getUserId(),
    };
    return this.http.post<any>(BASIC_URL + `api/admin/comments/create`, content,
     {
      params: params,
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCommentsByTaskId(taskId: number): Observable<any> {
    return this.http.get<any>(BASIC_URL + `api/admin/comments/${taskId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
