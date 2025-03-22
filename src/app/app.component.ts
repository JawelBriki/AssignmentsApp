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

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        if (this.authService.login(result.username, result.password)) {
          this.router.navigate(['/home']);
        } else {
          this.openLoginDialog();
        }
      }
    })
  }

  logout(): void {
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
