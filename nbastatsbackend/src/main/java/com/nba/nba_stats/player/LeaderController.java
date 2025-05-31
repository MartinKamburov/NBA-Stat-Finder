package com.nba.nba_stats.player;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/leaders")
public class LeaderController {

    private final JdbcTemplate jdbcTemplate;

    public LeaderController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/{stat}")
    public List<LeaderDTO> leaders(@PathVariable String stat) {

        String column = switch (stat) {
            case "pts", "ast", "trb" -> stat;                 // allow only the three stats
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        };

        String sql = """
            SELECT player,
                   team,
                   AVG(%s)::numeric(4,1) AS value
              FROM player_stats
          GROUP BY player, team
          ORDER BY value DESC
             LIMIT 5
        """.formatted(column);

        return jdbcTemplate.query(sql,
                (rs, i) -> new LeaderDTO(
                        rs.getString("player"),
                        rs.getString("team"),
                        rs.getDouble("value")));
    }
}