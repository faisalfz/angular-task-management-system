import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getTasksByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + `api/employee/tasks/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateTask(id: number, status: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/employee/task/${id}/${status}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/employee/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  createComment(taskId: number, content: string): Observable<any> {
    const params = {
      taskId: taskId,
      postedBy: StorageService.getUserId(),
    };
    return this.http.post<any>(BASIC_URL + `api/employee/comments/create`, content,
     {
      params: params,
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCommentsByTaskId(taskId: number): Observable<any> {
    return this.http.get<any>(BASIC_URL + `api/employee/comments/${taskId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
