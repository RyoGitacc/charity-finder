import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CharityList from './CharityList';
import { Link } from 'react-router-dom';

const CAUSES=["aapi-led", "adoption","afghanistan",'animals',"art",'athletics','autism',
'black-led','buddhism','cancer','cats','christianity','climate','conservation','coronavirus',
'culture','dance','disabilities','disease','dogs','education','environment',
'filmandtv','ood-security','freepress','gender-equality','health','hinduism','housing',
'humans','hurricane-ian','immigrants','indigenous-led','indigenous-peoples','islam','judaism',
'justice','latine-led','legal','lgbt','libraries','mental-health','museums','music','oceans',
'parks','poverty','racial-justice','radio','refugees','religion','research','science',
'seniors','space','theater','transgender','ukraine','veterans','votingrights','water','wildfires',
'wildlife','women-led','womens-health','youth'
]

export default function Search() {
    const [selectedCause, setSelectedCause]=useState<string>("");
    const [suggestions,setSuggestions]=useState<string[]>([]);
    const inputRef=useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
       const numOfCause:number = CAUSES.length;
       const randomIndex:number = Math.floor(Math.random() * numOfCause);
       setSelectedCause(CAUSES[randomIndex]);
    },[])

 const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
       const searchString:string = e.target.value;
       if(searchString){
         const filterdCauses = CAUSES.filter(c=>c.includes(searchString));
         setSuggestions(filterdCauses)
       }else{
        setSuggestions([]);
       }
 }

 const clickSuggestion=(selectedCause:string):void=>{
      setSelectedCause(selectedCause)
      setSuggestions([]);
      if(inputRef.current){
        inputRef.current.value=selectedCause
      }
 }


  return (
    <>
    <div className='search'>
      <h1 className='title'>Charity Finder</h1>
      <div className="input-container">
        <SearchIcon style={{width:"30px"}}/>
        <input className="input" name="keyword" type='text' placeholder='Enter something...' 
               onChange={(e)=>handleChange(e)} autoComplete='off' ref={inputRef}/>
        { suggestions.length !== 0 &&
          <div className='suggestion-container'>
            {  suggestions.map((s,index)=>(
                <span key={index} className='suggestion' onClick={()=>clickSuggestion(s)}>{s}</span>
              ))
            }
          </div>
        }
      </div>
    </div>
    <div className='favorite-btn-container'>
       <Link to={"/favorite"} className='favorite-circle'>
        <FavoriteIcon sx={{fontSize:"30px", color:"#c24e00"}}/>
       </Link>
    </div>
    <CharityList cause={selectedCause}/>
    </>
  )
}
