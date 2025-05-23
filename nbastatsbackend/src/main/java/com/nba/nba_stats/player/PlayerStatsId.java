package com.nba.nba_stats.player;

import java.io.Serializable;
import java.util.Objects;

//JPA requires any composite-key class to be Serializable hence why we added implements Serializable
//We have a composite key because we have two primary keys in use
public class PlayerStatsId implements Serializable {
    private String name;
    private String game_date;

    public PlayerStatsId() {}
    public PlayerStatsId(String name, String game_date) {
        this.name   = name;
        this.game_date = game_date;
    }

}
