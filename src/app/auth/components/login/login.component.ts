import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm!: FormGroup;

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (StorageService.isEmployeeLoggedIn()) {
            this.router.navigateByUrl('/employee/dashboard');
          }
        } else {
          this.snackBar
            .open(
              'Bad credentials', 'Close',
              { duration: 5000, panelClass: 'error-snackbar' }
            )
        }
      })
  }

}
