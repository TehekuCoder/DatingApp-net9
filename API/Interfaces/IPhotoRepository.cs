using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IPhotoRepository
{
Task<IEnumerable<PhotosForApprovalDto>> GetUnapprovedPhotosAsync();
Task<Photo?> GetPhotoByIdAsync(int id);
void RemovePhoto(Photo photo);
}
