import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';
import { SharedModule } from './shared/shared.module';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  SharedModule],
  // providers: [StorageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}