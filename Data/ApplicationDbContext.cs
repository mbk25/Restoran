using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Restorant.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Restorant.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Kategori> Kategoriler { get; set; }

        public DbSet<Menu> Menuler { get; set; }

        //public DbSet<Tatlı> AltCart { get; set; }
    }
}
