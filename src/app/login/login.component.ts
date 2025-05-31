import { Component, Inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-login',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogClose,
    MatDialogActions,
    MatButton,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  title = '';
  errorMessage: string | null = null;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: { isRegister: boolean, errorMessage: string | null}) {
    this.title = data.isRegister ? 'Register' : 'Log In';
    this.errorMessage = data.errorMessage;
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
