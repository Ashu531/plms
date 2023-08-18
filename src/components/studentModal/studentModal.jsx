import React,{useEffect,useState} from 'react';
import './studentModal.css';
import caretIcon from '../../assets/Icons/caretIcon.svg';
import InfiniteScroll from "react-infinite-scroll-component";
import Search from '../search/search.jsx';
import axios from 'axios';

export default function StudentModal({
    closeStudentModal,
    token
}) {

    const [query,setQuery] = useState('')
    const [pageNumber,setPageNumber] = useState(1)
    const [studentList,setStudentList] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(()=>{
        getStudentList()
    },[pageNumber])

    const getStudentList=async()=>{
        await axios.get(`${API_URL}/api/fees/v2/student/page/${window.innerHeight < 1100 ? 20 : 40}/${
            pageNumber
          }/?`,{
            headers: {
                token: `${token}`,
            },
        }).
        then(res => { 
            if(studentList.length > 0){
                setStudentList([...studentList,res.data.data])
            }else{
                setStudentList(res.data.data)
            }
            
        }).catch(err=>console.log(err));
    }
console.log(studentList,"jkhgfdszfghjkhgfdxg")
    const removeSearchQuery=()=>{
        setQuery('')
    }

    const onChange=(e)=>{
        setQuery(e)
    }

    const fetchMoreData=()=>{
        setPageNumber(pageNumber+1)
    }

    // const getScrollHeight = () => {

    //     if(selectedStudentsList.length > 1){
    //         switch(true){
    //             case window.innerHeight < 700: return window.innerHeight * 0.6;
    //             case window.innerHeight < 1300: return window.innerHeight * 0.68;
    //             default: return window.innerHeight * 0.85;
    //         }
    //     }

    //     switch(true){
    //         case window.innerHeight < 700: return window.innerHeight * 0.65;
    //         case window.innerHeight < 1300: return window.innerHeight * 0.78;
    //         default: return window.innerHeight * 0.9;
    //     }
    // }

  return (
    <div className='student-form-modal'>
       <div className='student-form-modal-content'>
                <div className='student-form-modal-header row'>
                    <div className='row' style={{justifyContent:'space-between'}}>
                        {/* <img src={caretIcon} onClick={closeStudentModal} style={{cursor:'pointer'}} /> */}
                        <span className='student-modal-header'>Student Creation</span>
                        <div style={{cursor:'pointer'}} onClick={closeStudentModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#b3b3b3" viewBox="0 0 256 256"><path d="M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className='student-modal-search-container'>
                    <Search
                      onChange={(e)=>onChange(e)}
                      query={query}
                      removeSearchQuery={()=>removeSearchQuery()}
                    />
                </div>
                <div className='student-modal-list'>
                    <InfiniteScroll
                        dataLength={studentList.length}
                        next={fetchMoreData}
                        hasMore={hasNextPage}
                        loader={<h4 style={{color:'#000'}}>Loading...</h4>}
                        height={560}
                        style={{  
                            paddingBottom: '10rem',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'flex-start',
                            gap:12,
                            width:'100%'
                        }}
                    >
                        {
                            studentList.map((item,index)=>{
                                return(
                                    <div className='student-list-element' key={index}>
                                        <p>{item.name}</p>
                                    </div>
                                )
                            })
                        }
                        
                    </InfiniteScroll>
                </div>
       </div>

   </div>
  )
}
