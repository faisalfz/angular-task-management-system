import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {

  taskForm: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfTaskStatus: any = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];
  id: number = this.activatedRoute.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]],
    });
    this.getAllUsers();
    this.getTaskById();
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe(res => {
      this.listOfEmployees = res;
    })
  }

  getTaskById() {
    this.adminService.getTaskById(this.id).subscribe(res => {
      this.taskForm.patchValue(res);
    })
  }

  updateTask(): void {
    if (this.taskForm.valid) {
      this.adminService.updateTask(this.id, this.taskForm.value).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Task updated successfully', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000
          });
        }
      })
    } else {
      for (const i in this.taskForm.controls) {
        this.taskForm.controls[i].markAsDirty();
        this.taskForm.controls[i].updateValueAndValidity();
      }
    }
  }

}

