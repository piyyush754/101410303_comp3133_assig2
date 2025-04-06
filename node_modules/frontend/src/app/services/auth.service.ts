import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// GraphQL Queries
const LOGIN_QUERY = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(
    this.getUserFromToken()
  );
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private apollo: Apollo, private router: Router) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.apollo
      .query({
        query: LOGIN_QUERY,
        variables: { usernameOrEmail, password },
      })
      .pipe(
        map((result: any) => result.data.login),
        tap((response) => this.setSession(response))
      );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: { username, email, password },
      })
      .pipe(
        map((result: any) => result.data.signup),
        tap((response) => this.setSession(response))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    // Reset Apollo cache
    this.apollo.client.resetStore();
    this.router.navigate(['/login']);
  }

  private setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);

    // Update authentication status
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(this.getUserFromToken());
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
