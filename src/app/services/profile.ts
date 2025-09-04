import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app.constants';
import { ProfileData } from '../models/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  http = inject(HttpClient);

  constructor() {}

  getProfileData(): Observable<ProfileData> {
    return this.http.get<ProfileData>(APP_CONSTANTS.DATA_URL).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
