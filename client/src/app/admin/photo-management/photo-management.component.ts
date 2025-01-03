import { Component, inject, OnInit } from '@angular/core';
import { Photo } from '../../_models/photo';
import { AdminService } from '../../_services/admin.service';
import {  NgFor } from '@angular/common';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css'],
  imports: [NgFor]
})
export class PhotoManagementComponent implements OnInit {
  photos: Photo[] = [];
  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe({
      next: (photos: Photo[]) => {
        this.photos = photos;
      },
      error: (err) => console.error('Error fetching photos:', err)
    });
  }

  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe({
      next: () =>
        this.photos.splice(
          this.photos.findIndex((p) => p.id === photoId),
          1
        ),
    });
  }

  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: () =>
        this.photos.splice(
          this.photos.findIndex((p) => p.id === photoId),
          1
        ),
    });
  }

  trackByPhotoId(index: number, photo: any): number {
    return photo.id;
  }
}
