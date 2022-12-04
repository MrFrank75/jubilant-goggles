
using System.Text.RegularExpressions;

public class GameHost{

    List<KeyValuePair<Guid,int>> _playerGuids = new List<KeyValuePair<Guid,int>>();

    public string StartGame(){

        Guid playerGuid = Guid.NewGuid();
        int randomNumber = Random.Shared.Next(1, 10001);
        _playerGuids.Add(new KeyValuePair<Guid, int>(playerGuid,randomNumber));       
        return playerGuid.ToString();
    }

    // returns -1 if the guess is lower, 0 if it is the same, 1 if the guess is higher
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
            _playerGuids.Remove(playerData);
            return 1;
        }

        return -1;
    }

    public int revealSolution(string guid){
        if (_playerGuids.Any(x=>x.Key.Equals(Guid.Parse(guid))) == false)
            throw new ArgumentException("Can't find the player in my database");

        var playerData = _playerGuids.Where(x=>x.Key.Equals(Guid.Parse(guid))).Single();
        return playerData.Value;
    }

    public List<Guid> listPlayers (){
        return _playerGuids.Select(x=>x.Key).ToList();
    }

}