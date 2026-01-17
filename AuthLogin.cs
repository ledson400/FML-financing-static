using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Configuration;
using System.Net;

public class AuthLogin
{
    private readonly IConfiguration _config;

    public AuthLogin(IConfiguration config)
    {
        _config = config;
    }

    [Function("AuthLogin")]
    public HttpResponseData Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get")]
        HttpRequestData req)
    {
        var tenantId = _config["ENTRA_TENANT_ID"];
        var clientId = _config["CLIENT_ID"];
        var redirectUri = _config["REDIRECT_URI"];

        var authUrl =
            $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize" +
            $"?client_id={clientId}" +
            $"&response_type=code" +
            $"&redirect_uri={WebUtility.UrlEncode(redirectUri)}" +
            $"&response_mode=query" +
            $"&scope=openid profile email";

        var res = req.CreateResponse(HttpStatusCode.Redirect);
        res.Headers.Add("Location", authUrl);
        return res;
    }
}
