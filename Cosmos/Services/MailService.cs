using Cosmos.Services.Interfaces;
using Google.Apis.Auth.OAuth2;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;

namespace Cosmos.Services
{
    public class MailService : IMailService
    {
        public async Task<bool> Authorize(string email)
        {
            var credential = new ServiceAccountCredential(new ServiceAccountCredential
                .Initializer(Environment.GetEnvironmentVariable("CLIENT_ID"))
                {
                    // Note: other scopes can be found here: https://developers.google.com/gmail/api/auth/scopes
                    Scopes = new[] { "https://mail.google.com/" },
                    User = "umeshanuc@gmail.com"
                });

            bool result = await credential.RequestAccessTokenAsync(CancellationToken.None);
            return result;
        }

        public async Task<bool> SendEmail(string senderEmail, MailMessage email, ServiceAccountCredential credential)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);

                // use the access token
                var oauth2 = new SaslMechanismOAuth2(senderEmail, credential.Token.AccessToken);
                client.Authenticate(oauth2);

                var message = new MimeMessage();
                message.To.Add(MailboxAddress.Parse("UmeshanUC@outlook.com"));

                try
                {
                    await client.SendAsync(message);
                }
                catch (Exception)
                {
                    client.Disconnect(true);
                    return false;
                }

                client.Disconnect(true);
            }

            return true;
        }
    }
}