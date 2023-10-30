import React,{useEffect,useState} from 'react';
import './studentModal.css';
import caretIcon from '../../assets/Icons/caretIcon.svg';
import InfiniteScroll from "react-infinite-scroll-component";
import Search from '../search/search.jsx';
import axios from 'axios';
import { Bars, TailSpin } from "react-loader-spinner";

export default function StudentModal({
    closeStudentModal,
    token,
    onStudentSelection
}) {

    const [query,setQuery] = useState('')
    const [pageNumber,setPageNumber] = useState(1)
    const [studentList,setStudentList] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loader,setLoader] = useState(false)
    const [noResult,setNoResult] = useState(false)

    useEffect(()=>{
        getStudentList()
    },[pageNumber])

    const getStudentList=async()=>{
        setNoResult(false)
        setLoader(true)
        await axios.get(`${API_URL}/api/fees/v2/student/page/${window.innerHeight < 1100 ? 20 : 40}/${
            pageNumber
          }/?`,{
            headers: {
                token: `${token}`,
            },
        }).
        then(res => { 
                console.log(res,"res+++")
                if(pageNumber <= 1){
                    if(res.data.data.length > 0){
                        setStudentList([...res.data.data])
                    }else{
                        setNoResult(true)
                    }
                }else{
                    setStudentList([...studentList,...res.data.data])
                }
            
            setLoader(false)
        }).catch(err=>{
            setLoader(false)
            console.log(err)
        });
    }

    const removeSearchQuery=()=>{
        setQuery('')
        setStudentList([])
        if(pageNumber > 1){
            setPageNumber(1)
        }else{
            getStudentList()
        }
    }

    const onSearch=(e)=>{
        setNoResult(false)
        if(e.length > 0){
            setQuery(e)
        }else{
            setQuery('')
            setStudentList([])
            if(pageNumber > 1){
                setPageNumber(1)
            }else{
                getStudentList()
            }
        }
    }

    const fetchMoreData=()=>{
        setPageNumber(pageNumber+1)
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if(query?.length > 0){
                handleSearch(query);
            }
         }, 500);
    
        return () => clearTimeout(delayDebounce);
      }, [query]);

    const handleSearch = async(query) => {
        //search api here
        await axios.get(`${API_URL}/api/fees/v2/optional_installment/student/page/1000/1/?search=${query}`,{
            headers: {
                token: `${token}`,
            },
        }).
        then(res => {
            if(res?.data?.data.length > 0){
                let list = res?.data?.data;
                setStudentList(list)
            }else{
                setStudentList([])
                setNoResult(true)
            }
        }).catch(err=>console.log(err));
      };

    const handleStudentSelect=(item)=>{
        onStudentSelection(item)
    }

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
                      onChange={(e)=>onSearch(e)}
                      query={query}
                      removeSearchQuery={()=>removeSearchQuery()}
                    />
                </div>
                <div className='student-modal-list' style={studentList.length > 4 ? {overflow: 'scroll'} : {overflow: 'hidden'}}>
                    { 
                     query && query.length > 0 ?
                            <div style={{  
                                paddingBottom: '10rem',
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'flex-start',
                                gap:12,
                                width:'100%'
                            }}>
                                {
                                studentList.map((item,index)=>{
                                    return(
                                        <div className='student-list-element' key={index} onClick={()=>handleStudentSelect(item)}>
                                            <p>{item.metadata.name}</p>
                                        </div>
                                    )
                                })}
                            </div>     : 
                        <InfiniteScroll
                            dataLength={studentList.length}
                            next={fetchMoreData}
                            hasMore={hasNextPage}
                            // loader={<h4 style={{color:'#000'}}>Loading...</h4>}
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
                                        <div className='student-list-element' key={index} onClick={()=>handleStudentSelect(item)}>
                                            <p>{item.metadata.name}</p>
                                        </div>
                                    )
                                })
                            }
                            
                        </InfiniteScroll>
                    }
                    { noResult &&
                        <div className='modal-no-result-content'>
                            <span>No Results</span>
                        </div>
                    }
                    
                </div>
       </div>
       {
            loader && 
            <div className="modal-credenc-loader-white modal-fullscreen-loader" style={{position:'fixed'}}>
                <TailSpin color="#00BFFF" height={60} width={60}/>
            </div>
        }
   </div>
  )
}
