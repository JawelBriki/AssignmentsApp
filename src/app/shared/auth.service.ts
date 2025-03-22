import {Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

interface User {
  username: string;
  password: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  private users: User[] = [
    {username: 'test', password: 'test', admin: false},
    {username: 'admin', password: 'admin', admin: true}
  ]

  login(username: string, password: string): boolean {
    let user = this.users.find(user => user.username === username && user.password === password);
    if (!!user) {
      this.currentUser = user;
      return true;
    } else {
      console.log("Authentication failed. Check username and/or password.");
      return false;
    }
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin() {
    // @ts-ignore
    return this.isLoggedIn() ? this.currentUser.admin : false;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
