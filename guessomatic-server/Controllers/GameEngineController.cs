using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace guessomatic_server.Controllers;

//[Authorize]
[ApiController]
[Route("[controller]")]
//[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class GameEngineController : ControllerBase 
{
    
    private readonly List<KeyValuePair<Guid,int>> _playerGuids;

    public GameEngineController(InMemoryDatabase inMemoryDatabase)
    {
        this._playerGuids = inMemoryDatabase.PlayerGuids;
    }

    [HttpGet("~/startgame")]
    public string StartGame(){

        Guid playerGuid = Guid.NewGuid();
        int randomNumber = Random.Shared.Next(1, 10001);
        _playerGuids.Add(new KeyValuePair<Guid, int>(playerGuid,randomNumber));       
        return playerGuid.ToString();
    }

    // returns -1 if the guess is lower, 0 if it is the same, 1 if the guess is higher
    [HttpGet("~/tryyourluck")]
    public int TryYourLuck(string guid, int guess){
        string guidRegexValidator = @"^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$";
        Regex guidRegex = new Regex(guidRegexValidator);

        if (guidRegex.IsMatch(guid)==false)
            throw new ArgumentException("The string passed doesn't seem to be a GUID");

        if (_playerGuids.Any(x=>x.Key.Equals(Guid.Parse(guid))) == false)
            throw new ArgumentException("Can't find the player in my database");

        var playerData = _playerGuids.Where(x=>x.Key.Equals(Guid.Parse(guid))).Single();
        if (guess == playerData.Value){
            _playerGuids.Remove(playerData);
            return 0;
        }
        
        if (guess > playerData.Value){
            return 1;
        }

        return -1;
    }

    [HttpGet("~/revealsolution")]
    public int revealSolution(string guid){
        if (_playerGuids.Any(x=>x.Key.Equals(Guid.Parse(guid))) == false)
            throw new ArgumentException("Can't find the player in my database");

        var playerData = _playerGuids.Where(x=>x.Key.Equals(Guid.Parse(guid))).Single();
        return playerData.Value;
    }

    [HttpGet("~/listPlayers")]
    public List<Guid> listPlayers (){
        return _playerGuids.Select(x=>x.Key).ToList();
    }
}