using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Http;
using System.Text.Json;

public class AuthCallback
{
    private readonly IConfiguration _config;
    private readonly HttpClient _http;

    public AuthCallback(IConfiguration config, IHttpClientFactory factory)
    {
        _config = config;
        _http = factory.CreateClient();
    }

    [Function("AuthCallback")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get")]
        HttpRequestData req)
    {
        var query = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
        var code = query["code"];

        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["client_id"] = _config["CLIENT_ID"],
            ["client_secret"] = _config["CLIENT_SECRET"],
            ["grant_type"] = "authorization_code",
            ["code"] = code!,
            ["redirect_uri"] = _config["REDIRECT_URI"],
        });

        var tokenRes = await _http.PostAsync(
            $"https://login.microsoftonline.com/{_config["ENTRA_TENANT_ID"]}/oauth2/v2.0/token",
            content);

        var json = await tokenRes.Content.ReadAsStringAsync();

        // TODO: create secure session cookie / JWT

        var res = req.CreateResponse(HttpStatusCode.Redirect);
        res.Headers.Add("Location", "/");
        return res;
    }
}
