using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace CosmosLib.Models
{
    [BsonIgnoreExtraElements]
    public class LoginDto
    {
        //[Display(Name = "Email Address")]
        //[Required(ErrorMessage = "Email Adress is required")]
        //[EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}