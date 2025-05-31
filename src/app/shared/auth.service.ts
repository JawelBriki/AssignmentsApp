import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  password: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private backendURL = "http://localhost:8010/api/auth"
  private backendURL = 'https://jawelbriki-assignmentsapi.onrender.com/api/auth';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Promise<boolean> {
    const registerData = { username, password };
    const URI = this.backendURL + "/register";

    return new Promise((resolve, reject) => {
      this.http.post<User>(URI, registerData).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Registration successful:', user);
          resolve(true);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          resolve(false);
        },
      });
    });
  }

  login(username: string, password: string): Promise<boolean> {
    const loginData = { username, password };
    const URI = this.backendURL + "/login";

    return new Promise((resolve, reject) => {
      this.http.post<User>(URI, loginData).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Login successful:', user);
          resolve(true);
        },
        error: (error) => {
          console.error('Login failed:', error);
          resolve(false);
        },
      });
    });
  }

  logout(): void {
    this.currentUser = null;
    // Optionnel : envoyer une requête au backend pour gérer la déconnexion
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() ? this.currentUser!.admin : false;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
