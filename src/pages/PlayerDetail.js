import React, { useState,useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'


const Playerdetail = (props) => {
    const { data } = props
    const [ detailInfo, setDetailInfo] = useState([])

    const searchParams = new URLSearchParams(
        props.location.search
      )
    // 從網址列上取得順序
    const playerID = searchParams.get('id')
    console.log(playerID)

    useEffect(() => {
        const newData = data[playerID]
        setDetailInfo(newData)
    }, []);
    
    return (
        <>   
        <div className="container detailwrap">
            <div className="row">
                <div className="playerInfo">
                    <div className="player">
                        <div className="icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <h2 className="playername">
                        {detailInfo.name}
                        </h2>
                    </div>
                    <div className="infoDetail">
                        <li>Team : {detailInfo.team_acronym}</li>
                        <li>TeamName : {detailInfo.team_name}</li>
                        <li>Games : {detailInfo.games_played}</li>
                        <li>MPG : {detailInfo.minutes_per_game}</li>
                        <li>FGA : {detailInfo.field_goals_attempted_per_game}</li>
                        <li>FGM : {detailInfo.field_goals_made_per_game}</li>
                        <li>FG% : {detailInfo.field_goal_percentage}</li>
                        <li>FT% : {detailInfo.free_throw_percentage}</li>
                        <li>3PA : {detailInfo.three_point_attempted_per_game}</li>
                        <li>3PM : {detailInfo.three_point_made_per_game}</li>
                        <li>3PT% : {detailInfo.three_point_percentage}</li>
                        <li>Points : {detailInfo.points_per_game}</li>
                        <li>ORebounds : {detailInfo.offensive_rebounds_per_game}</li>
                        <li>DRebounds : {detailInfo.defensive_rebounds_per_game}</li>
                        <li>Rebounds : {detailInfo.rebounds_per_game}</li>
                        <li>Assists : {detailInfo.assists_per_game}</li>
                        <li>Steals : {detailInfo.steals_per_game}</li>
                        <li>Blocks : {detailInfo.blocks_per_game}</li>
                        <li>Turnovers : {detailInfo.turnovers_per_game}</li>
                        <li>Efficiency : {detailInfo.player_efficiency_rating}</li>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default withRouter(Playerdetail);
