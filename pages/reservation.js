
import {useState,useEffect} from 'react'
import Header from './Header'
import { useRouter } from 'next/router'
import Reservation_css from '../component/reservation_css'
import Seat_reserve_css from '../component/seat_reserve_css'
import Link from 'next/link'
import Head from 'next/head'
import Axios from 'axios'
import{ DateAnchor,RegionAnchor,BranchAnchor,MovieAnchor,TimeAnchor } from '../component/example'



//오늘 날짜 ~ 2일뒤까지
var today = new Date()
var load_date = []
var price = 0
for (var i=0; i<3; i++) {
    load_date.push((today.getMonth() + 1) + '/' + today.getDate())
    today.setDate(today.getDate() + 1)
}

var poster = []

const DateOption = ({number,onClick,content,children})=>(
    <DateAnchor onClick={() => onClick(number)} isDate={number === content}>
        {children}
    </DateAnchor>
)
const RegionOption = ({number,onClick,choose_region,children})=>(
    <RegionAnchor onClick={() => onClick(number)} isRegion={number === choose_region}>
        {children}
    </RegionAnchor>
)
const BranchOption = ({number,onClick,choose_branch,children})=>(
    <BranchAnchor onClick={() => onClick(number)} isBranch={number === choose_branch}>
        {children}
    </BranchAnchor>
)
const MovieOption = ({number,onClick,choose_movie,children})=>(
    // console.log("movieOption");
    <MovieAnchor onClick={() => onClick(number)} isMovie={number === choose_movie}>
        {children}
    </MovieAnchor>
    // <MovieAnchor onClick={() => onClick(number)} isMovie={number === choose_movie}>
    // {children}
    // </MovieAnchor>
)



const TimeOption = ({number,onClick,choose_time,children})=>(
    <TimeAnchor onClick={() => onClick(number)} isTime={number === choose_time}>
        {children}
    </TimeAnchor>
)


const Reservation = () => {
    const router = useRouter();

    const current_user = localStorage.getItem('usrID')

    const [content, setContent] = useState(-1)
    const [region, setRegion] =useState(0)
    const [choose_region,setChooseRegion]=useState('서울')
    const [choose_branch,setChooseBranch]=useState(0)
    const [choose_movie,setChooseMovie]=useState(0)
    const [choose_time,setChooseTime]=useState(0)
    const [check, setCheck]=useState(false)
    const [seat, setSeat] = useState([])
    const [adult, setAdult] = useState(0);
    const [teen, setTeen] = useState(0);
    const [senior, setSenior] = useState(0);
    const [poster,setPoster] = useState('');

    var member = true;
    member = localStorage.getItem('member')

    var korean_name = '';
    function rename() {
        if (choose_movie === 'frozen2') {
            korean_name = '겨울왕국2(자막)'
        }
        else if (choose_movie === 'frozen2_sub') {
            korean_name = '겨울왕국2(더빙)'
        }
        else if (choose_movie === 'knivesOut') {
            korean_name = '나이브스아웃'
        }
    }

    function checkHandler(){
        if(check==false){
            setContent(-1)
            setChooseRegion(0)
            setChooseBranch(0)
            setChooseMovie(0)
            setChooseTime(0)
        }
    }
    function checkHandler2(){    
        setChooseTime(0)
        setSeat([])
        setAdult(0)
        setTeen(0)
        setSenior(0)        
    }

    function get_branch() {
        Axios({
            method: 'POST',
            url: '/reservation',
            data:{
                region: choose_region,
                branch: choose_branch,
                movie: choose_movie
            }
        }).then( (res) => {
            console.log(res.data.times);
        });
    }

    function get_price() {
        var total_price = 0;
        total_price += (10000 * adult);
        total_price += (7000 * teen);
        total_price += (7000 * senior);
        return total_price;
    }

    function get_reservation() {
        var seats = [];
        price = get_price();
        rename();
        for (var i=0; i<seat.length; i++) {
            seats.push(seat[i] + seat[i+1] + seat[i+2]);
            i = i + 3;
        }
        Axios({
            method: 'POST',
            url: '/reservation_process',
            data:{
                time: choose_time,
                seats: seats,
                branch: choose_branch,
                movie: korean_name
            }
        }).then( (res) => {
            localStorage.setItem('theater_id', res.data.theater_num)
            localStorage.setItem('movie_id', res.data.movie_id)
            localStorage.setItem('branch', choose_branch)
            localStorage.setItem('date', content)
            localStorage.setItem('movie', choose_movie)
            localStorage.setItem('time', choose_time)
            localStorage.setItem('seat', seats)
            localStorage.setItem('price', price)
            localStorage.setItem('eng_title', choose_movie)
            console.log(choose_movie)
            console.log(localStorage.getItem('eng_title'))
            var cnt = 0;
            cnt = cnt + (adult*1);
            cnt = cnt + (senior*1);
            cnt = cnt + (teen*1);
            localStorage.setItem('count', cnt)
            router.push({pathname: '/PriceCheck' });
        });
    }



    useEffect(()=>{
        if(check === false){
            var confirms = document.getElementsByClassName("confirm");
            if(content != 0 && choose_region!==0 && choose_branch !==0 && choose_movie !=0 ){
                confirms[0].disabled = false;
            }
            else{
                confirms[0].disabled=true;
            }
        }
        else{
            var seats = document.getElementsByName("seat");
            for(var i = 0; i<seats.length; i++){
                if(seats[i].checked){
                    seats[i].disabled=true;
                }
            }
            if(seat.length==0){
                for(var i = 0; i<seats.length; i++ ){
                    seats[i].disabled=false;
                    seats[i].checked=false;
                }
            }

            if(seat.length/4 == (adult*1+teen*1+senior*1)){
                for(var i = 0; i<seats.length; i++){
                    seats[i].disabled=true;
                }
             }else {
                for(var i = 0; i<seats.length;i++){
                    seats[i].disabled= false;
                }
            }
            var pays = document.getElementsByClassName("btn2");
            if(choose_time != 0 && seat != []){
                pays[0].disabled=false
            }
            else{
                pays[0].disabled=true
            }
        }
    })
    




    
    
    const seoul = (
        
        <div class="scroll">
                <div class="ex">
                    <BranchOption onClick={setChooseBranch} number={'가산디지털'} choose_branch={choose_branch}>가산디지털</BranchOption>
                    {/* <p class={toggle ? "pink":"store"} onClick={() => setToggle(!toggle)} >가산디지털</p> */}
                    <BranchOption onClick={setChooseBranch} number={'건대입구'} choose_branch={choose_branch}>건대입구</BranchOption>

                </div>
                <div class="ex">
                    <BranchOption onClick={setChooseBranch} number={'서울대입구'} choose_branch={choose_branch}>서울대입구</BranchOption>
                    <BranchOption onClick={setChooseBranch} number={'브로드웨이(신사)'} choose_branch={choose_branch}>신사</BranchOption>
                </div>
                <div class="ex">
                    <BranchOption onClick={setChooseBranch} number={'수유'} choose_branch={choose_branch}>수유</BranchOption>
                    <BranchOption onClick={() => {alert('준비중입니다.')}} number={'신도림'} choose_branch={choose_branch}>신도림</BranchOption>
                </div>
                <div class="ex">
                    <BranchOption onClick={() => {alert('준비중입니다.')}} number={'신림'} choose_branch={choose_branch}>신림</BranchOption>
                    <BranchOption onClick={() => {alert('준비중입니다.')}} number={'에비뉴엘(명동)'} choose_branch={choose_branch}>명동</BranchOption>
                </div>
                <div class="ex">
                    <BranchOption onClick={() => {alert('준비중입니다.')}} number={'영등포'} choose_branch={choose_branch}>영등포</BranchOption>
                    <BranchOption onClick={() => {alert('준비중입니다.')}} number={'용산'} choose_branch={choose_branch}>용산</BranchOption>
                </div>
            </div>
    )

    const movies=(
        <div class="scroll">
                <MovieOption onClick={setChooseMovie} number={'frozen2'} choose_movie={choose_movie}>겨울왕국2(자막)</MovieOption>
                <MovieOption onClick={() => {alert('준비중입니다.')}} number={'frozen2_sub'} choose_movie={choose_movie}>겨울왕국2(더빙)</MovieOption>
                <MovieOption onClick={setChooseMovie} number={'포드V페라리(자막)'} choose_movie={choose_movie}>포드V페라리(자막)</MovieOption>
                <MovieOption onClick={setChooseMovie} number={'knivesOut'} choose_movie={choose_movie}>나이브스 아웃(자막)</MovieOption>
                <MovieOption onClick={() => {alert('준비중입니다.')}} number={'감쪽같은 그녀'} choose_movie={choose_movie}>감쪽같은 그녀</MovieOption>
                <MovieOption onClick={() => {alert('준비중입니다.')}} number={'라스트 크리스마스'} choose_movie={choose_movie}>라스트 크리스마스</MovieOption>
        </div>
    )

    const region_list=[seoul]
   
    const reservation=(
        <div>
            <Reservation_css/>
            <div class="reserveContainer">
                <h1 class="bigTitle">예매</h1>
                <div class="date">
                    <h3>날짜</h3>
                    <div class="point">
                    <DateOption onClick={setContent} number={load_date[0]} content={content}>{load_date[0]}</DateOption>
                        <DateOption onClick={setContent} number={load_date[1]} content={content}>{load_date[1]}</DateOption>
                        <DateOption onClick={setContent} number={load_date[2]} content={content}>{load_date[2]}</DateOption>
                        {/* <DateOption onClick={setContent} number={'12/10'} content={content}>12/10</DateOption>
                        <DateOption onClick={setContent} number={'12/11'} content={content}>12/11</DateOption>
                        <DateOption onClick={setContent} number={'12/12'} content={content}>12/12</DateOption>
                        <DateOption onClick={setContent} number={'12/13'} content={content}>12/13</DateOption>
                        <DateOption onClick={setContent} number={'12/14'} content={content}>12/14</DateOption>
                        <DateOption onClick={setContent} number={'12/15'} content={content}>12/15</DateOption>
                        <DateOption onClick={setContent} number={'12/16'} content={content}>12/16</DateOption>
                        <DateOption onClick={setContent} number={'12/17'} content={content}>12/17</DateOption>
                        <DateOption onClick={setContent} number={'12/18'} content={content}>12/18</DateOption>
                        <DateOption onClick={setContent} number={'12/19'} content={content}>12/19</DateOption>
                        <DateOption onClick={setContent} number={'12/20'} content={content}>12/20</DateOption>
                        <DateOption onClick={setContent} number={'12/21'} content={content}>12/21</DateOption>
                        <DateOption onClick={setContent} number={'12/22'} content={content}>12/22</DateOption>
                        <DateOption onClick={setContent} number={'12/23'} content={content}>12/23</DateOption>
                        <DateOption onClick={setContent} number={'12/24'} content={content}>12/24</DateOption>
                        <DateOption onClick={setContent} number={'12/25'} content={content}>12/25</DateOption>
                        <DateOption onClick={setContent} number={'12/26'} content={content}>12/26</DateOption>
                        <DateOption onClick={setContent} number={'12/27'} content={content}>12/27</DateOption>
                        <DateOption onClick={setContent} number={'12/28'} content={content}>12/28</DateOption>
                        <DateOption onClick={setContent} number={'12/29'} content={content}>12/29</DateOption>
                        <DateOption onClick={setContent} number={'12/30'} content={content}>12/30</DateOption>
                        <DateOption onClick={setContent} number={'12/31'} content={content}>12/31</DateOption>
                        <DateOption onClick={setContent} number={'1/1'} content={content}>1/1</DateOption>
                        <DateOption onClick={setContent} number={'1/2'} content={content}>1/2</DateOption>
                        <DateOption onClick={setContent} number={'1/3'} content={content}>1/3</DateOption>
                        <DateOption onClick={setContent} number={'1/4'} content={content}>1/4</DateOption>
                        <DateOption onClick={setContent} number={'1/5'} content={content}>1/5</DateOption>
                        <DateOption onClick={setContent} number={'1/6'} content={content}>1/6</DateOption> */}




                    </div>
                </div>
                <hr class="hr" />
                
                <br/>
                <div class="make_choice"> 
                    <div class="choice">
                        <RegionOption onClick={setChooseRegion} number={'서울'} choose_region={choose_region}> <div onClick={()=> setRegion(0)}>서울</div></RegionOption>
                    </div>
                    <div class="choice">
                        {region_list[region]}
                    </div>
                    <div class="choice">
                        {movies}
                    </div> 

                </div>
                <div class="next">
                        <button class="confirm" onClick={()=>setCheck(true)}>확인</button>
                        {/* <button class="confirm" onClick={()=>checkHandler3()}>확인</button> */}
                    <button class="cancel" onClick={()=>checkHandler()}>취소</button> 

                    
                </div>                  
            </div>
            <div class="below"></div>
        </div>
    )

    const seat_reserve=(
        <div>
            <Seat_reserve_css/>
            <div class='reserve_checkContainer'>
                <h1>영화 예매</h1>
                <hr class='line'/>
                <div class='reserve_check'>
                    <div class='reserve'>
                        <h2>상영시간</h2>
                        <div class = 'movie_playtime'>
                                <TimeOption onClick={setChooseTime} number ={'10:00'} choose_time ={choose_time}>10:00</TimeOption>
                                <TimeOption onClick={setChooseTime} number ={'12:00'} choose_time ={choose_time}>12:00</TimeOption>
                                <TimeOption onClick={setChooseTime} number ={'14:00'} choose_time ={choose_time}>14:00</TimeOption>
                                <TimeOption onClick={setChooseTime} number ={'16:00'} choose_time ={choose_time}>16:00</TimeOption>
                                <TimeOption onClick={setChooseTime} number ={'18:00'} choose_time ={choose_time}>18:00</TimeOption>
                        </div>
                        <div class="movie_memnum">
                            <h3>인원/좌석</h3>
                            <p>성인</p>
                            <select name="adult_num" value={adult} onChange={(e)=>setAdult(e.target.value)}>
                                    <option value={0} selected="selected">0명</option>
                                    <option value={1}>1명</option>
                                    <option value={2}>2명</option>
                                    <option value={3}>3명</option>
                                    <option value={4}>4명</option>
                            </select>
                            <p>청소년</p>
                            <select name="kid_num" value={teen} onChange={(e)=>setTeen(e.target.value)}>
                                    <option value={0} selected="selected">0명</option>
                                    <option value={1}>1명</option>
                                    <option value={2}>2명</option>
                                    <option value={3}>3명</option>
                                    <option value={4}>4명</option>
                            </select>
                            <p>시니어</p>
                            <select name="senior_num" value={senior} onChange={(e)=>setSenior(e.target.value)}>
                                    <option value={0} selected="selected">0명</option>
                                    <option value={1}>1명</option>
                                    <option value={2}>2명</option>
                                    <option value={3}>3명</option>
                                    <option value={4}>4명</option>
                            </select>
                            {/* <button class = 'btn1' type="button" onClick={()=>checkHandler2()}>다시선택</button> */}
                            <img onClick={()=>checkHandler2()} class="refresh_img" src="refresh.png"/>
                        </div>
                        <div class='seat_map'>
                            <div class='screen'>
                                <p><i>screen</i></p>
                            </div>
                            <div class='seatA'>
                                <p><u>A</u></p>
                                <input onClick={()=>setSeat(seat + ["A01 "])} type="checkbox" name='seat' value={'1'} />
                                <input onClick={()=>setSeat(seat + ["A02 "])} type="checkbox" name='seat' value={'2'}/> 
                                <input onClick={()=>setSeat(seat + ["A03 "])} class="thirdTwelve" type="checkbox" name='seat' value={'3'} />
                                <input onClick={()=>setSeat(seat + ["A04 "])} type="checkbox" name='seat' value={'4'} />
                                <input onClick={()=>setSeat(seat + ["A05 "])} type="checkbox" name='seat' value={'5'} />
                                <input onClick={()=>setSeat(seat + ["A06 "])} type="checkbox" name='seat' value={'6'} />
                                <input onClick={()=>setSeat(seat + ["A07 "])} type="checkbox" name='seat' value={'7'} />
                                <input onClick={()=>setSeat(seat + ["A08 "])} type="checkbox" name='seat' value={'8'} />
                                <input onClick={()=>setSeat(seat + ["A09 "])} type="checkbox" name='seat' value={'9'} />
                                <input onClick={()=>setSeat(seat + ["A10 "])} type="checkbox" name='seat' value={'10'} />
                                <input onClick={()=>setSeat(seat + ["A11 "])} type="checkbox" name='seat' value={'11'} />
                                <input onClick={()=>setSeat(seat + ["A12 "])} class="thirdTwelve" type="checkbox" name='seat' value={'12'} />
                                <input onClick={()=>setSeat(seat + ["A13 "])} type="checkbox" name='seat' value={'13'} />
                                <input onClick={()=>setSeat(seat + ["A14 "])} type="checkbox" name='seat' value={'14'} />
                                <input onClick={()=>setSeat(seat + ["A15 "])} type="checkbox" name='seat' value={'15'} />
                            </div>
                            <div class='seatB_G'>
                                <p><u>B</u></p>
                                <input onClick={()=>setSeat(seat + ["B01 "])} type="checkbox" name='seat' value='1'/> 
                                <input onClick={()=>setSeat(seat + ["B02 "])} type="checkbox" name='seat' value='2' />
                                <input onClick={()=>setSeat(seat + ["B03 "])} class="thirdTwelve" type="checkbox" name='seat' value='3' />
                                <input onClick={()=>setSeat(seat + ["B04 "])} type="checkbox" name='seat' value='4' />
                                <input onClick={()=>setSeat(seat + ["B05 "])} type="checkbox" name='seat' value='5' />
                                <input onClick={()=>setSeat(seat + ["B06 "])} type="checkbox" name='seat' value='6' />
                                <input onClick={()=>setSeat(seat + ["B07 "])} type="checkbox" name='seat' value='7' />
                                <input onClick={()=>setSeat(seat + ["B08 "])} type="checkbox" name='seat' value='8' />
                                <input onClick={()=>setSeat(seat + ["B09 "])} type="checkbox" name='seat' value='9' />
                                <input onClick={()=>setSeat(seat + ["B10 "])} type="checkbox" name='seat' value='10' />
                                <input onClick={()=>setSeat(seat + ["B11 "])} type="checkbox" name='seat' value='11' />
                                <input onClick={()=>setSeat(seat + ["B12 "])} class="thirdTwelve" type="checkbox" name='seat' value='12' />
                                <input onClick={()=>setSeat(seat + ["B13 "])} type="checkbox" name='seat' value='13' />
                                <input onClick={()=>setSeat(seat + ["B14 "])} type="checkbox" name='seat' value='14' />
                                <input onClick={()=>setSeat(seat + ["B15 "])} type="checkbox" name='seat' value='15' />
                            </div>
                            <div class='seatB_G'>
                                <p><u>C</u></p>
                                <input onClick={()=>setSeat(seat + ["C01 "])} type="checkbox" name='seat' value='1' />
                                <input onClick={()=>setSeat(seat + ["C02 "])} type="checkbox" name='seat' value='2' />
                                <input onClick={()=>setSeat(seat + ["C03 "])} class="thirdTwelve" type="checkbox" name='seat' value='3' />
                                <input onClick={()=>setSeat(seat + ["C04 "])} type="checkbox" name='seat' value='4' />
                                <input onClick={()=>setSeat(seat + ["C05 "])} type="checkbox" name='seat' value='5' />
                                <input onClick={()=>setSeat(seat + ["C06 "])} type="checkbox" name='seat' value='6' />
                                <input onClick={()=>setSeat(seat + ["C07 "])} type="checkbox" name='seat' value='7' />
                                <input onClick={()=>setSeat(seat + ["C08 "])} type="checkbox" name='seat' value='8' />
                                <input onClick={()=>setSeat(seat + ["C09 "])} type="checkbox" name='seat' value='9' />
                                <input onClick={()=>setSeat(seat + ["C10 "])} type="checkbox" name='seat' value='10' />
                                <input onClick={()=>setSeat(seat + ["C11 "])} type="checkbox" name='seat' value='11' />
                                <input onClick={()=>setSeat(seat + ["C12 "])} class="thirdTwelve" type="checkbox" name='seat' value='12'/>
                                <input onClick={()=>setSeat(seat + ["C13 "])} type="checkbox" name='seat' value='13' />
                                <input onClick={()=>setSeat(seat + ["C14 "])} type="checkbox" name='seat' value='14' />
                                <input onClick={()=>setSeat(seat + ["C15 "])} type="checkbox" name='seat' value='15' />
                            </div>
                            <div class='seatB_G'>
                                <p><u>D</u></p>
                                <input  onClick={()=>setSeat(seat + ["D01 "])} type="checkbox" name='seat' value='1' />
                                <input  onClick={()=>setSeat(seat + ["D02 "])} type="checkbox" name='seat' value='2' />
                                <input  onClick={()=>setSeat(seat + ["D03 "])} class="thirdTwelve" type="checkbox" name='seat' value='3' />
                                <input  onClick={()=>setSeat(seat + ["D04 "])} type="checkbox" name='seat' value='4' />
                                <input  onClick={()=>setSeat(seat + ["D05 "])} type="checkbox" name='seat' value='5' />
                                <input  onClick={()=>setSeat(seat + ["D06 "])} type="checkbox" name='seat' value='6' />
                                <input  onClick={()=>setSeat(seat + ["D07 "])} type="checkbox" name='seat' value='7' />
                                <input  onClick={()=>setSeat(seat + ["D08 "])} type="checkbox" name='seat' value='8' />
                                <input  onClick={()=>setSeat(seat + ["D09 "])} type="checkbox" name='seat' value='9' />
                                <input  onClick={()=>setSeat(seat + ["D10 "])} type="checkbox" name='seat' value='10' />
                                <input  onClick={()=>setSeat(seat + ["D11 "])} type="checkbox" name='seat' value='11' />
                                <input  onClick={()=>setSeat(seat + ["D12 "])} class="thirdTwelve" type="checkbox" name='seat' value='12' />
                                <input  onClick={()=>setSeat(seat + ["D13 "])} type="checkbox" name='seat' value='13' />
                                <input  onClick={()=>setSeat(seat + ["D14 "])} type="checkbox" name='seat' value='14' />
                                <input  onClick={()=>setSeat(seat + ["D15 "])} type="checkbox" name='seat' value='15' />
                            </div>
                            <div class='seatB_G'>
                                <p><u>E</u></p>
                                <input onClick={()=>setSeat(seat + ["E01 "])} type="checkbox" name='seat' value='1' />
                                <input onClick={()=>setSeat(seat + ["E02 "])} class="thirdTwelve" type="checkbox" name='seat' value='2' />
                                <input onClick={()=>setSeat(seat + ["E03 "])} type="checkbox" name='seat' value='3' />
                                <input onClick={()=>setSeat(seat + ["E04 "])} type="checkbox" name='seat' value='4' />
                                <input onClick={()=>setSeat(seat + ["E05 "])} type="checkbox" name='seat' value='5' />
                                <input onClick={()=>setSeat(seat + ["E06 "])} type="checkbox" name='seat' value='6' />
                                <input onClick={()=>setSeat(seat + ["E07 "])} type="checkbox" name='seat' value='7' />
                                <input onClick={()=>setSeat(seat + ["E08 "])} type="checkbox" name='seat' value='8' />
                                <input onClick={()=>setSeat(seat + ["E09 "])} type="checkbox" name='seat' value='9' />
                                <input onClick={()=>setSeat(seat + ["E10 "])} type="checkbox" name='seat' value='10' />
                                <input onClick={()=>setSeat(seat + ["E11 "])} type="checkbox" name='seat' value='11' />
                                <input onClick={()=>setSeat(seat + ["E12 "])} class="thirdTwelve" type="checkbox" name='seat' value='12' />
                                <input onClick={()=>setSeat(seat + ["E13 "])} type="checkbox" name='seat' value='13' />
                                <input onClick={()=>setSeat(seat + ["E14 "])} type="checkbox" name='seat' value='14' />
                                <input onClick={()=>setSeat(seat + ["E15 "])} type="checkbox" name='seat' value='15' />
                            </div>
                            <div class='seatB_G'>
                                <p><u>F</u></p>
                                <input onClick={()=>setSeat(seat + ["F01 "])} type="checkbox" name='seat' value='1' />
                                <input onClick={()=>setSeat(seat + ["F02 "])} type="checkbox" name='seat' value='2' />
                                <input onClick={()=>setSeat(seat + ["F03 "])} class="thirdTwelve" type="checkbox" name='seat' value='3' />
                                <input onClick={()=>setSeat(seat + ["F04 "])} type="checkbox" name='seat' value='4' />
                                <input onClick={()=>setSeat(seat + ["F05 "])} type="checkbox" name='seat' value='5' />
                                <input onClick={()=>setSeat(seat + ["F06 "])} type="checkbox" name='seat' value='6' />
                                <input onClick={()=>setSeat(seat + ["F07 "])} type="checkbox" name='seat' value='7' />
                                <input onClick={()=>setSeat(seat + ["F08 "])} type="checkbox" name='seat' value='8' />
                                <input onClick={()=>setSeat(seat + ["F09 "])} type="checkbox" name='seat' value='9' />
                                <input onClick={()=>setSeat(seat + ["F10 "])} type="checkbox" name='seat' value='10'/>
                                <input onClick={()=>setSeat(seat + ["F11 "])} type="checkbox" name='seat' value='11'/>
                                <input onClick={()=>setSeat(seat + ["F12 "])} class="thirdTwelve" type="checkbox" name='seat' value='12' />
                                <input onClick={()=>setSeat(seat + ["F13 "])} type="checkbox" name='seat' value='13' />
                                <input onClick={()=>setSeat(seat + ["F14 "])} type="checkbox" name='seat' value='14' />
                                <input onClick={()=>setSeat(seat + ["F15 "])} type="checkbox" name='seat' value='15' />
                            </div>
                            <div class='seatB_G'>
                                <p><u>G</u></p>
                                <input onClick={()=>setSeat(seat + ["G01 "])} type="checkbox" name='seat' value='1' />
                                <input onClick={()=>setSeat(seat + ["G02 "])} type="checkbox" name='seat' value='2' />
                                <input onClick={()=>setSeat(seat + ["G03 "])} class="thirdTwelve" type="checkbox" name='seat' value='3' />
                                <input onClick={()=>setSeat(seat + ["G04 "])} type="checkbox" name='seat' value='4' />
                                <input onClick={()=>setSeat(seat + ["G05 "])} type="checkbox" name='seat' value='5' />
                                <input onClick={()=>setSeat(seat + ["G06 "])} type="checkbox" name='seat' value='6' />
                                <input onClick={()=>setSeat(seat + ["G07 "])} type="checkbox" name='seat' value='7' />
                                <input onClick={()=>setSeat(seat + ["G08 "])} type="checkbox" name='seat' value='8' />
                                <input onClick={()=>setSeat(seat + ["G09 "])} type="checkbox" name='seat' value='9' />
                                <input onClick={()=>setSeat(seat + ["G10 "])} type="checkbox" name='seat' value='10' />
                                <input onClick={()=>setSeat(seat + ["G11 "])} type="checkbox" name='seat' value='11' />
                                <input onClick={()=>setSeat(seat + ["G12 "])} class="thirdTwelve" type="checkbox" name='seat' value='12' />
                                <input onClick={()=>setSeat(seat + ["G13 "])} type="checkbox" name='seat' value='13' />
                                <input onClick={()=>setSeat(seat + ["G14 "])} type="checkbox" name='seat' value='14' />
                                <input onClick={()=>setSeat(seat + ["G15 "])} type="checkbox" name='seat' value='15' />
                            </div>
                        </div>
                        <div class='img_checkBox'>
                                <img src='seat.png'/>
                                <p>선택 가능</p>
                                <img src='seat_checked.png'/>
                                <p>선택 불가능</p>
                        </div>
                    </div>
                    <div class='check'>
                        <h3>예매 정보</h3>
                        <img class = 'check_poster' src={choose_movie+".jpg"}/>
                        <div class='check_name'>
                            <h5>{choose_movie}</h5>
                            <h5>3D</h5>
                        </div>
                        <div class='see_info'>
                            <p>상영일<h5>{content}</h5></p><br/>
                            <p>상영시간<h5>{choose_time}</h5></p><br/>
                            <p>상영관<h5>{choose_branch}</h5></p><br/>
                            <p>좌석<h5>{seat}</h5></p><br/>
                        </div>
                        
                        <div class='buy_btn'>
                            <button class = 'btn1' type="button" onClick={()=>checkHandler2()}>취소</button>
                            <Link href="/PriceCheck"><button class = 'btn2' type="button" onClick={get_reservation}>결제</button></Link>
                        </div>
                    </div>
                </div>  
            </div>
            <div class='empty'>
                <div class="copyright">
                    Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div>
            </div>
        </div>
    )


    return(
        <div> 
            <Head>
                <title>
                    TIC-영화예매
                </title>
            </Head>
            <Header />
            {check ? seat_reserve: reservation}
        </div>
        
    )
}

export default Reservation