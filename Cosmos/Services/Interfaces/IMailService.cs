using Google.Apis.Auth.OAuth2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Cosmos.Services.Interfaces
{
    public interface IMailService
    {
        Task<bool> Authorize(string email);
        public Task<bool> SendEmail(string senderEmail, MailMessage email, ServiceAccountCredential credential);
    }
}
