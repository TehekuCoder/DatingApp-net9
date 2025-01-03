import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Photo } from '../_models/photo';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserWithRoles(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]): Observable<string[]> {
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  getPhotosForApproval(): Observable<Photo[]> {
    return this.http.get<{ result: Photo[] }>(this.baseUrl + 'admin/photos-to-moderate').pipe(
      map(response => response.result)
    );
  }

  approvePhoto(photoId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/approve-photo/' + photoId, {});
  }

  rejectPhoto(photoId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/reject-photo/' + photoId, {});
  }
}
