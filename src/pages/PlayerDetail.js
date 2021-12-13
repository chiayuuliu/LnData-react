import React, { useState,useEffect } from 'react';
import { withRouter } from 'react-router-dom'


const Playerdetail = (props) => {
    const { data } = props
    const [ detailInfo, setDetailInfo] = useState([])
    const [dataID, setDataID] = useState(data)


    const searchParams = new URLSearchParams(
        props.location.search
      )
    // 從網址列上取得id
    const playerID = parseInt(searchParams.get('id'))
    // console.log('detail',data)

    function handelData(data) {
        // 照point 順序排列
        let newData = []
        newData = data.sort((a,b)=>b.points_per_game-a.points_per_game)
        // 給ID值
        let dataID = [...newData]
        for(let i =0;i<newData.length; i++){
            dataID[i].ID= i
        }
        setDataID(dataID)
    }

    useEffect(() => {
        handelData(data)
        let newData=[]
        console.log('dataID',dataID[0])
        console.log(dataID[0].ID)
        console.log(dataID[0].ID==playerID)
        dataID.forEach(el => {
            if(el.ID==playerID){
                newData.push(el)
            }
        });
        console.log(newData)
        setDetailInfo(newData[0])
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
