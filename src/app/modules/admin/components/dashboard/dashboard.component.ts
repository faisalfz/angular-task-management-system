import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTasks: any = [];
  searchTaskForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.searchTaskForm = this.fb.group({
      title: [null]
    })
    this.getAllTasks();
  }

  submitForm() {
    this.listOfTasks = [];
    const title = this.searchTaskForm.get('title')!.value;
    this.adminService.searchTasks(title).subscribe(res => {
      this.listOfTasks = res;
    })
  }

  getAllTasks() {
    this.adminService.getAllTasks().subscribe(res => {
      this.listOfTasks = res;
    })
  }

  deleteTask(id: number): void {
    this.adminService.deleteTask(id).subscribe((res) => {
      this.snackBar.open('Task deleted successfully', 'Close', {
        duration: 5000
      });
      this.getAllTasks();
    })
  }

}
