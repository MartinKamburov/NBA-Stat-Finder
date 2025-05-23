//This class handles the "business logic" layer - where you enforce rules, orchestration, transactions, etc.
package com.nba.nba_stats.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PlayerService {
    private final PlayerRepo playerRepo;

    @Autowired //Dependency injecting
    public PlayerService(PlayerRepo playerRepo){
        this.playerRepo = playerRepo;
    }

    public List<Player> getPlayers(){
        return playerRepo.findAll();
    }

    //Since the repository method is List<Player> findAllByName(String name); make it return List<Player>
    public List<Player> getPlayerByName (String name){
        return playerRepo.findAllByName(name);
    }

}
