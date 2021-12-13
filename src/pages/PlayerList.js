import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Barchart from '../components/BarChart';

const Playerlist = (props) => {
    // 球員資料
    const { data } = props
    // 呈現的資料
    const [ displayData, setDisplayData]= useState([])
    const [ team, setTeam ] = useState( 'ALL' )
    // 關鍵字搜尋
    const [searchWord, setSearchWord] = useState('')
    // 頁數列表
    const [pagination, setPagination] = useState([])
    const [nowpage, setNowpage] = useState(1)
    // 總頁數
    const [ totalPage, setTotalPage] = useState(0)
    //  篩選後的資料
    const [filterData, setFilterData] = useState([])
    const [dataID, setDataID] = useState(data)
    // 圖表用array
    const [label, setLabel] = useState([])
    const [chartdata, setChartData] = useState([])
    // false 讓圖表一開始消失，true的時候出現
    const [chart, setChart] = useState(false)
    const [sortBy, setSortBy ] = useState('points')

    // 資料排序
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
    function handelSort(dataID) {
        let newData=[]
        if(sortBy=='points'){
            setDataID(dataID)
        }
        if(sortBy=='games'){
            newData = dataID.sort((a,b)=>
                b.games_played-a.games_played
            )
            setDataID(newData)
        }
        if(sortBy==='rebounds'){
            newData = dataID.sort((a,b)=>
                b.rebounds_per_game-a.rebounds_per_game
            )
            setDataID(newData)
        }
        if(sortBy==='assists'){
            newData = dataID.sort((a,b)=>
                b.assists_per_game-a.assists_per_game
            )
            setDataID(newData)
        }
        if(sortBy==='steals'){
            newData = dataID.sort((a,b)=>
                b.steals_per_game-a.steals_per_game
            )
            setDataID(newData)
        }
        if(sortBy==='blocks'){
            newData = dataID.sort((a,b)=>
                b.blocks_per_game-a.blocks_per_game
            )
            setDataID(newData)
        }
    }

    // 取出Team 名稱
    let TeamAr=[]
    for (let i = 0;i< data.length; i++){
        if (!TeamAr.includes(data[i].team_acronym )){
            TeamAr.push(data[i].team_acronym )
        }
    }
    // 取出TeamName 
    let TeamNameAr=[]
    for (let i = 0;i< data.length; i++){
        if (!TeamNameAr.includes(data[i].team_name )){
            TeamNameAr.push(data[i].team_name )
        }
    }
    // 統計隊伍數量
    const teamQtyAr =[]
    for (let i =0; i <TeamNameAr.length; i++){
        let obj={ name:TeamNameAr[i], qty:0}
        teamQtyAr.push(obj)
    }
    // 有配對到的qty 值+1 
    for (let i = 0 ; i < data.length; i++){
        for (let k = 0; k<teamQtyAr.length; k++){
            if(data[i].team_name==teamQtyAr[k].name){
                teamQtyAr[k].qty +=1
            }
        }
    }
    // 篩選少於15人的隊伍
    const teamUnder = teamQtyAr.filter(function(el){
        return el.qty <=15
    })

    // 圖表的隊伍標籤/人數
    let chartLabel=[]
    let chartData=[]
    teamUnder.forEach(el=>{
        chartLabel.push(el.name)
        chartData.push(el.qty)
    })

    useEffect(() => {
        //處理資料(排序+給ID)
        handelData(data)
        handelSort(dataID)
        // 只取出15筆資料，設定顯示資料
       const newData = dataID.slice((nowpage-1)*15,nowpage*15)
       setDisplayData(newData) 
       // 設定頁碼
       const newTotalPages = Math.ceil(dataID.length/15)
       setTotalPage(newTotalPages)
       // 設定圖表資料
       setLabel(chartLabel)
       setChartData(chartData)
       setChart(true)
       
    }, [sortBy]);

    // 總頁數有變化時重生成頁碼
    useEffect(() => {
        let pages=[]
        for (let i=1;i<=totalPage;i++){
            pages.push(i)
        }
        // 總頁數大於4座頁碼數量控制
        if(pages.length>4){
            let showPage = pages.slice(nowpage-1, nowpage+5)
            setPagination(showPage)
        }else{
            setPagination(pages)
        }
    }, [totalPage, nowpage]);


    // 頁數跟篩選資料改變，重新取得顯示資料
    useEffect(() => {
        // 設定資料、頁數
        if(filterData.length){
            const newData = filterData.slice((nowpage-1)*15,nowpage*15)
            setDisplayData(newData)
            // 設定篩選後的資料頁數
            let newPages = Math.ceil(filterData.length/15)
            setTotalPage(newPages)
        }else{
            const newData = data.slice((nowpage-1)*15,nowpage*15)
            setDisplayData(newData)
            let newPages = Math.ceil(data.length/15)
            setTotalPage(newPages)
        }
        setLabel(chartLabel)
        setChartData(chartData)
        

    }, [nowpage,filterData]);


    // 資料篩選
    // 如果searchword 空白也可以篩選
    function dataFilter(team,searchWord) {
        let newData=[]
        if(team=='ALL' && !searchWord){
            newData=[...dataID]
        }
        if(team=='ALL' && searchWord){
            newData = dataID.filter(function(el){
                return el.name.includes(searchWord)
            }) 
        }
        if(team!=='ALL' && searchWord){
            newData = dataID.filter(function(el){
                return el.team_acronym ===team && el.name.includes(searchWord)
            }) 
        }
        if(team!=='ALL' && !searchWord){
            newData = dataID.filter(function(el){
                return el.team_acronym ===team
            })
        }
        // 有資料再設定回狀態
        if(newData.length){
            setFilterData(newData)
        }else{
            alert('無符合條件資料')
        }
    }

    // 處理資料排序
    // useEffect(() => {
    //     handelSort(dataID) 
    // }, [sortBy]);


    return (
    <>
    <div className="container chartcontainer">
        {/* 搜尋欄位 */}
        <div className="wrap">
            <div className="searchwrap">
                <search>
                    <label htmlFor="team">Team : </label>
                    <select className="team"id="team"
                    value={team}
                    onChange={(e)=>{
                        setTeam(e.target.value)
                    }}>
                        <option value="ALL">ALL</option>
                    {TeamAr.map((v,i)=>{
                        return(
                            <option value={v}
                            key={i}>{v}</option>
                        )
                    })}
                    </select>
                </search>
            </div>
            <div className="keywordwarp">
                <label htmlFor="keyword">Keyword : </label>
                <input type="text"
                    className='searchinput'
                    placeholder='請輸入關鍵字'
                    value={searchWord}
                    onChange={(e)=>{
                        setSearchWord(e.target.value)
                    }}
                />
            </div>
            <button
            className="searchbtn"
            onClick={()=>{
                dataFilter(team,searchWord)
            }}>Search</button>
        </div>
        <button className="chartbtn"
            onClick={(e)=>{
                setChart(false)
            }}
            >Show Charts</button>

        {/* 資料欄位 */}
        <div className="datawrap">
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Team</th>
                    <th scope="col">Name</th>
                    <th scope="col"
                    className='sort'
                    onClick={(e)=>{
                        console.log('games')
                         setSortBy('games')
                     }}>Games</th>
                    <th scope="col"
                    className='sort'
                     onClick={(e)=>{
                         setSortBy('points')
                     }}>Points</th>
                    <th scope="col"
                    className='sort'
                    onClick={(e)=>{
                         setSortBy('rebounds')
                     }}>Rebounds</th>
                    <th scope="col"
                    className='sort'
                    onClick={(e)=>{
                         setSortBy('assists')
                     }}>Assists</th>
                    <th scope="col"
                    className='sort'
                    onClick={(e)=>{
                         setSortBy('steals')
                     }}>Steals</th>
                    <th scope="col"
                    className='sort'
                    onClick={(e)=>{
                         setSortBy('blocks')
                     }}>Blocks</th>
                    <th scope="col">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {displayData.map((v,i)=>{
                      return (
                          <>
                          <tr key={i}>
                            <td>{v.team_acronym}</td>
                            <td>{v.name}</td>
                            <td>{v.games_played}</td>
                            <td>{v.points_per_game}</td>
                            <td>{v.rebounds_per_game}</td>
                            <td>{v.assists_per_game}</td>
                            <td>{v.steals_per_game}</td>
                            <td>{v.blocks_per_game}</td>
                            <td>
                                <Link to={`/detail?id=${v.ID}`}>
                                    <i className="fas fa-search"></i>
                                </Link>
                            </td>
                            </tr>
                        </>
                      )
                  })}
                </tbody>
              </table>
        </div>
        {/* 頁數 */}
        <nav aria-label="Page navigation example">
            <ul className="pagination">
            {/* 第一頁 */}
            <li className="page-item">
                <a className="page-link" 
                onClick={(e) => {
                    if(nowpage>1){
                        setNowpage(1)
                    }
                }}><i className="fas fa-angle-double-left"></i></a>
              </li>
            {/* 前一頁 */}
              <li className="page-item">
                <a className="page-link" 
                onClick={(e) => {
                    if(nowpage>1){
                        setNowpage(nowpage-1)
                    }
                }}>Previous</a>
                </li>
                {/* 頁數 */}
              {pagination.map((v,i)=>{
                  return(
                    <li className="page-item">
                        <a className="page-link" 
                        key={i}
                        onClick={(e) => {
                            setNowpage(v)
                        }}
                        >{v}</a>
                    </li>
                  )
              })}
              <li className="page-item">
              {/* 下一頁 */}
                <a className="page-link" 
                onClick={(e) => {
                    if(nowpage<totalPage){
                        setNowpage(nowpage+1)
                    }
                }}>Next</a>
              </li>
              {/* 最後一頁 */}
              <li className="page-item">
                <a className="page-link"  
                onClick={(e) => {
                    if(nowpage<totalPage){
                        setNowpage(totalPage)
                    }
                }}><i className="fas fa-angle-double-right"></i></a>
              </li>

              <div className="page">第 {nowpage} 頁 / 共{totalPage}頁</div>
            </ul>
        </nav>
        <div className="chartwrap"
            style={{
                display: chart ? 'none' : 'block'
            }}>
            <div className="chart">
                <button className="close"
                    onClick={(e)=>{
                        setChart(true)
                    }}    
                >Close</button>
                <Barchart
                    label={label}
                    chartdata={chartdata}
                    
                />
            </div>
        </div>
    </div>
    </>
    );
};



export default Playerlist;
