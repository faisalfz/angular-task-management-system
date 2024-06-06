import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-view-task-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent {

  taskData: any;
  comments: any;
  taskId = this.activatedRoute.snapshot.params['id'];

  commentForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: [null, [Validators.required]],
    })
    this.getTaskById();
  }

  getTaskById() {
    this.employeeService.getTaskById(this.taskId).subscribe(res =>{
      this.taskData = res;
      console.log(this.taskData);
      this.getCommentsByPost();
    }, error =>{
      this.matSnackBar.open("Something Went Wrong!!!!", "Ok")
    })
  }

  publishComment() {
    this.employeeService.createComment(this.taskId, this.commentForm.get('content')?.value

    ).subscribe(
      (response) => {
        // Handle the response as needed
        console.log('Comment created successfully:', response);
        this.matSnackBar.open("Comment Published Successfully", "Ok");
        this.getCommentsByPost();
      },
      (error) => {
        // Handle the error
        console.error('Error creating comment:', error);
        this.matSnackBar.open("Something Went Wrong!!!!", "Ok")
      }
    );
  }

  getCommentsByPost() {
    this.employeeService.getAllCommentsByTaskId(this.taskId).subscribe(res => {
      this.comments = res;
      console.log(this.comments)
    }, error => {
      this.matSnackBar.open("Something Went Wrong!!!!", "Ok")
    })
  }
}
