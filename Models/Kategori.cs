using System.ComponentModel.DataAnnotations;

namespace Restorant.Models
{
    public class Kategori
    {
        [Key]

        public int Id { get; set; }
        [Required]

        public string Name { get; set; }
    }
}
