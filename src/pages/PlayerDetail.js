import React, { useState,useEffect } from 'react';

const Playerdetail = (props) => {

    const { playerInfo } = props
    // const [ playerInfo, setPlayerInfo] = useState([])

    // useEffect(() => {
    //     const newPlayerInfo = data.filter(function(el){
    //         return el.name === player
    //     })
    //     setPlayerInfo(newPlayerInfo)
    //     console.log(newPlayerInfo)
    // // const P=[...playerInfo]

    // }, []);
    const P=[...playerInfo]
    console.log(P[0].name)
    console.log(playerInfo)
    
    return (
        <>   
        <div className="container">
            <div className="row">
                <div className="playerInfo">
                    <div className="player">
                        <div className="icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <h2 className="playername">
                        {P[0].name}
                        </h2>
                    </div>
                    <div className="infoDetail">
                        <li>Team : {P[0].team_acronym}</li>
                        <li>TeamName : {P[0].team_name}</li>
                        <li>Games : {P[0].games_played}</li>
                        <li>MPG : {P[0].minutes_per_game}</li>
                        <li>FGA : {P[0].field_goals_attempted_per_game}</li>
                        <li>FGM : {P[0].field_goals_made_per_game}</li>
                        <li>FG% : {P[0].field_goal_percentage}</li>
                        <li>FT% : {P[0].free_throw_percentage}</li>
                        <li>3PA : {P[0].three_point_attempted_per_game}</li>
                        <li>3PM : {P[0].three_point_made_per_game}</li>
                        <li>3PT% : {P[0].three_point_percentage}</li>
                        <li>Points : {P[0].points_per_game}</li>
                        <li>ORebounds : {P[0].offensive_rebounds_per_game}</li>
                        <li>DRebounds : {P[0].defensive_rebounds_per_game}</li>
                        <li>Rebounds : {P[0].rebounds_per_game}</li>
                        <li>Assists : {P[0].assists_per_game}</li>
                        <li>Steals : {P[0].steals_per_game}</li>
                        <li>Blocks : {P[0].blocks_per_game}</li>
                        <li>Turnovers : {P[0].turnovers_per_game}</li>
                        <li>Efficiency : {P[0].player_efficiency_rating}</li>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Playerdetail;
