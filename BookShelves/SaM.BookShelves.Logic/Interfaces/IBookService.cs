﻿using SaM.BookShelves.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SaM.BookShelves.Logic.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookViewModel>> GetAllBooks();
        Task<IEnumerable<BookViewModel>> GetSearchBooks(string tagSearch, string termSearch);
    }
}
