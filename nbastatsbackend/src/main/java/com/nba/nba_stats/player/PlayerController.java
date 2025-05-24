//The controller layer in a spring boot application handles incoming http requests delegates them to the service layer
//and returns the appropriate response
package com.nba.nba_stats.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //This marks the class as a Spring MVC controller where every method returns a domain object instead of a view
@RequestMapping(path = "api/player")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired //This allows the controller to delegate the business logic back to the service layer
    public PlayerController(PlayerService playerService){
        this.playerService = playerService;
    }

    @GetMapping //This handles http get requests
    public List<Player> getPlayers(){
        return playerService.getPlayers();
    }

    /*
    ResponseEntity is used in this scenario because if we just returned a list of Player, by default Spring will send a 200 OK status even if the player is not found.
    But by using ResponseEntity if the player lookup fails then it will allow us to return a 404 Not Found error which is exactly what we want.
     */
    @GetMapping ("/{name}")
    public ResponseEntity<List<Player>> getSpecficPlayer(@PathVariable String name){ //PathVariable is used to extract the values directly from the URI path within a request. Useful for mapping dynamic parts of the URL.
        List<Player> games = playerService.getPlayerByName(name);

        if(games.isEmpty()){
            return ResponseEntity.notFound().build(); //This is how you make the 404 not found error
        }
        return ResponseEntity.ok(games);
    }


}
