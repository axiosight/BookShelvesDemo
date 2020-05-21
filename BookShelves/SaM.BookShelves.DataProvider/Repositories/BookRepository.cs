using Microsoft.EntityFrameworkCore;
using SaM.BookShelves.DataProvider.Interfaces;
using SaM.BookShelves.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SaM.BookShelves.DataProvider.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookShelvesContext _context;

        public BookRepository(BookShelvesContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<BookViewModel>> GetAllBooks()
        {
            var res = (from p in _context.Books
                      select new BookViewModel()
                      {
                          Id = p.Id,
                          ISBN = p.ISBN,
                          Name = p.Name,
                          OriginalName = p.OriginalName,
                          Year = p.Year,
                          Description = p.Description,
                          TagViewModels = (from pc in _context.BookTags
                                           join c in _context.Tags on pc.TagId equals c.Id
                                           where pc.BookId == p.Id
                                           select new TagViewModel()
                                           {
                                               Id = c.Id,
                                               Name = c.Name
                                           }).ToList(),
                          AuthorViewModels = (from pc in _context.BookAuthors
                                              join c in _context.Authors on pc.AuthorId equals c.Id
                                              where pc.BookId == p.Id
                                              select new AuthorViewModel()
                                              {
                                                  Id = c.Id,
                                                  Name = c.Name
                                              }).ToList(),
                          PublisherViewModels = (from pc in _context.BookPublishers
                                                 join c in _context.Publishers on pc.PublisherId equals c.Id
                                                 where pc.BookId == p.Id
                                                 select new PublisherViewModel()
                                                 {
                                                     Id = c.Id,
                                                     Name = c.Name
                                                 }).ToList(),
                          BookEntityViewModels = (from pc in _context.BookEntities
                                                  where pc.BookId == p.Id
                                                  select new BookEntityViewModel()
                                                  {
                                                      Id = pc.Id,
                                                      LibraryId = pc.LibraryId,
                                                      AppUserId = pc.AppUserId,
                                                      BookId = pc.BookId,
                                                      StatusId = pc.StatusId
                                                  }).ToList(),
                          PreviewViewModelMain = (from pc in _context.Previews
                                                  where pc.BookId == p.Id
                                                  where pc.IsPreview == true
                                                  select new PreviewViewModel()
                                                  {
                                                      Id = pc.Id,
                                                      Img = pc.Img,
                                                      IsPreview = pc.IsPreview,
                                                      Type = pc.Type,
                                                      Extension = pc.Extension
                                                  }).FirstOrDefault()
                      }).ToList();
            return res;
        }

        public async Task<IEnumerable<BookViewModel>> GetSearchBooks(string tagSearch, string termSearch)
        {
            var res = (from p in _context.Books
                       where p.Name.Contains(termSearch)
                       select new BookViewModel()
                       {
                           Id = p.Id,
                           ISBN = p.ISBN,
                           Name = p.Name,
                           OriginalName = p.OriginalName,
                           Year = p.Year,
                           Description = p.Description,
                           TagViewModels = (from pc in _context.BookTags
                                            join c in _context.Tags on pc.TagId equals c.Id
                                            where pc.BookId == p.Id
                                            select new TagViewModel()
                                            {
                                                Id = c.Id,
                                                Name = c.Name
                                            }).ToList(),
                           AuthorViewModels = (from pc in _context.BookAuthors
                                               join c in _context.Authors on pc.AuthorId equals c.Id
                                               where pc.BookId == p.Id
                                               select new AuthorViewModel()
                                               {
                                                   Id = c.Id,
                                                   Name = c.Name
                                               }).ToList(),
                           PublisherViewModels = (from pc in _context.BookPublishers
                                                  join c in _context.Publishers on pc.PublisherId equals c.Id
                                                  where pc.BookId == p.Id
                                                  select new PublisherViewModel()
                                                  {
                                                      Id = c.Id,
                                                      Name = c.Name
                                                  }).ToList(),
                           BookEntityViewModels = (from pc in _context.BookEntities
                                                   where pc.BookId == p.Id
                                                   select new BookEntityViewModel()
                                                   {
                                                       Id = pc.Id,
                                                       LibraryId = pc.LibraryId,
                                                       AppUserId = pc.AppUserId,
                                                       BookId = pc.BookId,
                                                       StatusId = pc.StatusId
                                                   }).ToList(),
                          PreviewViewModelMain = (from pc in _context.Previews
                                                  where pc.BookId == p.Id
                                                  where pc.IsPreview == true
                                                  select new PreviewViewModel()
                                                  {
                                                      Id = pc.Id,
                                                      Img = pc.Img,
                                                      IsPreview = pc.IsPreview,
                                                      Type = pc.Type,
                                                      Extension = pc.Extension
                                                  }).FirstOrDefault()
                       }).ToList();
            return res;
        }
    }
}
