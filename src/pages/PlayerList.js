import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

const Playerlist = (props) => {
    // 球員資料
    const { data,setPlayer } = props
    // 呈現的資料
    const [ displayData, setDisplayData]= useState([])
    const [ teamName, setTeamName ] = useState( 'ALL' )
    // 關鍵字搜尋
    const [searchWord, setSearchWord] = useState('')
    // 頁數列表
    const [pagination, setPagination] = useState([])
    const [nowpage, setNowpage] = useState(1)
    // 總頁數
    const [ totalPage, setTotalPage] = useState(0)
    //  篩選後的資料
    const [filterData, setFilterData] = useState([])

    

    
    // 取出Team 名稱
    let TeamNameAr=[]
    for (let i = 0;i< data.length; i++){
        if (!TeamNameAr.includes(data[i].team_acronym )){
            TeamNameAr.push(data[i].team_acronym )
        }
    }
    
    useEffect(() => {
        // 只取出15筆資料
       const newData = data.slice((nowpage-1)*15,nowpage*15)
       setDisplayData(newData) 
       const newTotalPages = Math.ceil(data.length/15)
       setTotalPage(newTotalPages)

    }, []);

    // 總頁數有變化時重生成頁碼
    useEffect(() => {
        let pages=[]
        for (let i=1;i<=totalPage;i++){
            pages.push(i)
        }
        let showPage = pages.slice(nowpage-1, nowpage+4)
        setPagination(showPage)
    }, [totalPage, nowpage]);


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

    }, [nowpage,filterData]);

    // 資料篩選
    function dataFilter(teamName,searchWord ) {
        const filterData = data.filter(function(el){
            return el.team_acronym ===teamName && el.name.includes( searchWord)
        })
        setFilterData(filterData)
    }

    return (
        <div className="container">
        {/* 搜尋欄位 */}
        <div className="wrap">
            <div className="searchwrap">
                <search>
                    <label htmlhtmlFor="team">Team</label>
                    <select className="team"id="team"
                    value={teamName}
                    onChange={(e)=>{
                        setTeamName(e.target.value)
                    }}>
                        <option value="ALL">ALL</option>
                    {TeamNameAr.map((v,i)=>{
                        return(
                            <option value={v}>{v}</option>
                        )
                    })}
                    </select>
                </search>
            </div>
            <div className="keywordwarp">
                <label htmlFor="keyword">Ketword : </label>
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
            onClick={()=>{
                dataFilter(teamName,searchWord)
            }}>Search</button>
        </div>
        <button className="chartbtn">Show Charts</button>

        {/* 資料欄位 */}
        <div className="datawrap">
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Team</th>
                    <th scope="col">Name</th>
                    <th scope="col">Games</th>
                    <th scope="col">Points</th>
                    <th scope="col">Rebounds</th>
                    <th scope="col">Assists</th>
                    <th scope="col">Steals</th>
                    <th scope="col">Blocks</th>
                    <th scope="col">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {displayData.map((v,i)=>{
                      return (
                          <>
                          <tr>
                            <th>{v.team_acronym}</th>
                            <td>{v.name}</td>
                            <td>{v.games_played}</td>
                            <td>{v.points_per_game}</td>
                            <td>{v.rebounds_per_game}</td>
                            <td>{v.assists_per_game}</td>
                            <td>{v.steals_per_game}</td>
                            <td>{v.blocks_per_game}</td>
                            <td>
                                <Link 
                                onClick={(e)=>{
                                    setPlayer(v.name)
                                }}
                                to={`/detail`}>
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
            <li className="page-item">
                <a className="page-link" 
                onClick={(e) => {
                    if(nowpage>1){
                        setNowpage(1)
                    }
                }}><i class="fas fa-angle-double-left"></i></a>
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
                }}><i class="fas fa-angle-double-right"></i></a>
              </li>

              <p>第 {nowpage} / 共{totalPage}頁</p>
            </ul>
        </nav>
    </div>
    );
};



export default Playerlist;
