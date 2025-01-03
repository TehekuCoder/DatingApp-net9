using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PhotoRepository(DataContext context) : IPhotoRepository
{
    public async Task<Photo?> GetPhotoByIdAsync(int id)
    {
        return await context.Photos
        .IgnoreQueryFilters()
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<PhotosForApprovalDto>> GetUnapprovedPhotosAsync()
    {
        return await context.Photos
            .IgnoreQueryFilters()
            .Where(p => !p.IsApproved)
            .Select(p => new PhotosForApprovalDto
            {
                Id = p.Id,
                Url = p.Url,
                Username = p.AppUser.UserName,
                IsApproved = p.IsApproved
            }).ToListAsync();
    }

    public void RemovePhoto(Photo photo)
    {
        context.Photos.Remove(photo);
    }
}
