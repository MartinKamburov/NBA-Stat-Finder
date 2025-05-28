//This class allows us to interact with the JDBC database giving us CRUD (Create, read, update, delete) functionality for the Player entity
//This class is the data-access layer talking to the database
//This class allows us to use the CRUD operations without having to write any JDBC or SQL ourselves
//The Spring Data JPA is a module that simplifies the development of data access layers using the Java Persistence API (JPA). It allows developers to interact with databases using a repository-style interface without writing boilerplate code.
package com.nba.nba_stats.player;
//Basically we are defining queries in this class to put it simply


import org.springframework.data.jpa.repository.JpaRepository; //Provides a ton of methods like (save, findAll, findById, delete, paging, sorting, etc.)
import org.springframework.stereotype.Repository; //This marks this interface as a Spring bean

import java.util.List;
import java.util.Optional; //This is used for nullable query results

@Repository //Tells Spring to detect this interface during component scanning and to apply database-related exception translation
public interface PlayerRepo extends JpaRepository<Player, PlayerStatsId> { //Player is the entity type this repo manages, PlayerStatsId is the type of its primary key
    //By putting <Player, PlayerStatsId> this is how Spring Data JPA knows the two critical pieces of information. The entity and the type of that entity's primary key

    void deleteByName(String playerName); //This is just the java equivalent of a query, it would look like this in SQL: DELETE FROM player_stats WHERE name = ?
    Optional<Player> findByName(String name); // In SQL this would look like: SELECT * FROM player_stats WHERE name = ?
    List<Player> findAllByName(String name);
    //Use Name and not player since that is what I called my property in the entity class
    List<Player> findByNameStartingWithIgnoreCase(String prefix);

}
//In this interface is where you declare any queries you need (beyond the generic CRUD ones)
//A generic query would be findById(PlayerStatsId, id), findAll(), deleteById(playerStatsId, id)
//I am basically just adding to the list of query possibilities in which I am adding findByName(String name) and deleteByName(String name)

/*
    In this file to query you are basically writing a derived query method.
    This is how Spring Data JPA splits up the query:
        - [action][By][Property][Operator][Options]
        For example: List<Player> findByTeam(String team);
        Becomes: SELECT *
                  FROM player_stats
                 WHERE team = :team
 */