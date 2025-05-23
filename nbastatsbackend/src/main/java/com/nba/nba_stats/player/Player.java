//This class maps all the data from our database
//This is the M in MVC
package com.nba.nba_stats.player;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity //Signals that this is an Entity class
@Table(name="player_stats") //This specifies the table name if you don't include this it will automatically use the class name as the table name. Make sure it is the PostgreSQL table name
@IdClass(PlayerStatsId.class) //Since there are two primary keys (a composite key) we need to include this
public class Player {

    @Id //This annotation marks that field as part of the primary key of the table
    @Column(name = "player", nullable = false) //This annotation will map to the column named player, this is put because the java variable made name doesn't exactly match the db column player. Specify column attributes.
    private String name; //Since I named the variable name but the column in the database is named player I used the column annotation to specify it

    private String team;
    private String opponent;
    private String result;
    private Float minutes_played;
    private Integer fg;
    private Integer fga;
    private Float fg_pct;
    private Integer three_pm;
    private Integer three_pa;
    private Float three_pct;
    private Integer ft;
    private Integer fta;
    private Float ft_pct;
    private Integer orb;
    private Integer drb;
    private Integer trb;
    private Integer ast;
    private Integer stl;
    private Integer blk;
    private Integer tov;
    private Integer pf;
    private Integer pts;
    private Float gmsc;
    @Id
    @Column(name = "game_date", nullable = false)
    private String game_date;

    public Player() {}

    public Player(String name, String team, String opponent, String result, Float minutes_played, Integer fg, Integer fga, Float fg_pct, Integer three_pm, Integer three_pa, Float three_pct, Integer ft, Float ft_pct, Integer fta, Integer orb, Integer drb, Integer trb, Integer ast, Integer stl, Integer blk, Integer tov, Integer pf, Integer pts, Float gmsc, String game_date) {
        this.name = name;
        this.team = team;
        this.opponent = opponent;
        this.result = result;
        this.minutes_played = minutes_played;
        this.fg = fg;
        this.fga = fga;
        this.fg_pct = fg_pct;
        this.three_pm = three_pm;
        this.three_pa = three_pa;
        this.three_pct = three_pct;
        this.ft = ft;
        this.ft_pct = ft_pct;
        this.fta = fta;
        this.orb = orb;
        this.drb = drb;
        this.trb = trb;
        this.ast = ast;
        this.stl = stl;
        this.blk = blk;
        this.tov = tov;
        this.pf = pf;
        this.pts = pts;
        this.gmsc = gmsc;
        this.game_date = game_date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Integer getFg() {
        return fg;
    }

    public void setFg(Integer fg) {
        this.fg = fg;
    }

    public Float getMinutes_played() {
        return minutes_played;
    }

    public void setMinutes_played(Float minutes_played) {
        this.minutes_played = minutes_played;
    }

    public Float getFg_pct() {
        return fg_pct;
    }

    public void setFg_pct(Float fg_pct) {
        this.fg_pct = fg_pct;
    }

    public Integer getFga() {
        return fga;
    }

    public void setFga(Integer fga) {
        this.fga = fga;
    }

    public Integer getThree_pm() {
        return three_pm;
    }

    public void setThree_pm(Integer three_pm) {
        this.three_pm = three_pm;
    }

    public Integer getThree_pa() {
        return three_pa;
    }

    public void setThree_pa(Integer three_pa) {
        this.three_pa = three_pa;
    }

    public Float getThree_pct() {
        return three_pct;
    }

    public void setThree_pct(Float three_pct) {
        this.three_pct = three_pct;
    }

    public Integer getFt() {
        return ft;
    }

    public void setFt(Integer ft) {
        this.ft = ft;
    }

    public Integer getFta() {
        return fta;
    }

    public void setFta(Integer fta) {
        this.fta = fta;
    }

    public Float getFt_pct() {
        return ft_pct;
    }

    public void setFt_pct(Float ft_pct) {
        this.ft_pct = ft_pct;
    }

    public String getGame_date() {
        return game_date;
    }

    public void setGame_date(String game_date) {
        this.game_date = game_date;
    }

    public Float getGmsc() {
        return gmsc;
    }

    public void setGmsc(Float gmsc) {
        this.gmsc = gmsc;
    }

    public Integer getPts() {
        return pts;
    }

    public void setPts(Integer pts) {
        this.pts = pts;
    }

    public Integer getPf() {
        return pf;
    }

    public void setPf(Integer pf) {
        this.pf = pf;
    }

    public Integer getOrb() {
        return orb;
    }

    public void setOrb(Integer orb) {
        this.orb = orb;
    }

    public Integer getDrb() {
        return drb;
    }

    public void setDrb(Integer drb) {
        this.drb = drb;
    }

    public Integer getTrb() {
        return trb;
    }

    public void setTrb(Integer trb) {
        this.trb = trb;
    }

    public Integer getAst() {
        return ast;
    }

    public void setAst(Integer ast) {
        this.ast = ast;
    }

    public Integer getBlk() {
        return blk;
    }

    public void setBlk(Integer blk) {
        this.blk = blk;
    }

    public Integer getStl() {
        return stl;
    }

    public void setStl(Integer stl) {
        this.stl = stl;
    }

    public Integer getTov() {
        return tov;
    }

    public void setTov(Integer tov) {
        this.tov = tov;
    }



}
