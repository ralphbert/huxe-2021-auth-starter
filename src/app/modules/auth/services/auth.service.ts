import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, map, mapTo, tap} from 'rxjs/operators';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
}

export interface SessionResponse {
  jwt: string;
  user: UserResponse;
}

const sessionKey = 'session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<SessionResponse> {
    return this.httpClient.post<SessionResponse>(
      `${environment.apiUrl}/auth/local`,
      {identifier: username, password}
    ).pipe(
      tap((response) => {
        this.setSessionData(response);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(sessionKey);
  }

  getMe(): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${environment.apiUrl}/users/me`);
  }

  isAuthenticated(): boolean {
    const data = this.getSessionData();
    return !!data?.jwt;
  }

  getAuthToken(): string {
    if (this.isAuthenticated()) {
      return this.getSessionData().jwt;
    }

    return null;
  }

  setSessionData(data: SessionResponse): void {
    localStorage.setItem(sessionKey, JSON.stringify(data));
  }

  getSessionData(): SessionResponse | null {
    const data = localStorage.getItem(sessionKey);
    return JSON.parse(data);
  }

  /**
   * used to check if the stored session token is still valid.
   * this is done by trying to access a secured api call.
   * if not it will be deleted.
   */
  initSession(): Observable<void> {
    return this.getMe().pipe(
      catchError(error => {
        this.logout();
        return of(null);
      }),
      mapTo(null),
    );
  }
}
