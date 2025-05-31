import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsService } from './shared/assignments.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDividerModule,
    MatIconModule, RouterLink, MatToolbarModule, MatSidenavModule, FormsModule, MatList, MatListItem, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titre = 'Assignment Tracker';
  opened = false;

  constructor(private assignmentsService: AssignmentsService,
              public dialog: MatDialog,
              protected authService: AuthService,
              private router: Router) {}

  openLoginDialog(isRegister: boolean, errorMessage: string | null = null) {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: { isRegister, errorMessage }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log('The dialog was closed', result);
      if (result) {

        if (!isRegister) {
          let loginAttempt = await this.authService.login(result.username, result.password);
          if (loginAttempt) {
            this.router.navigate(['/home']);
          } else {
            this.openLoginDialog(false, "Login failed. Please check your credentials.");
          }
        }

        else {
          let registerAttempt = await this.authService.register(result.username, result.password);
          if (registerAttempt) {
            this.router.navigate(['/home']);
          } else {
            this.openLoginDialog(true, "Username already exists.");
          }
        }
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  genererDonneesDeTest() {
    console.log("Génération des données de test");
    //this.assignmentsService.peuplerBD()

    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Toutes les données de test ont été insérées");

      // Je navigue vers la page qui affiche la liste des assignments
      window.location.href = '/home';
    });

  }
}
