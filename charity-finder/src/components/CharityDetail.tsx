import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { orgType } from "../type";
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import noImage from '../assets/noimage.png'



export default function CharityDetail() {
    const [org,setOrg]=useState<orgType>();
    const apiKey=import.meta.env.VITE_API_KEY;
    const einParams = useParams<{ein:string | undefined}>().ein;
    const navigate = useNavigate();
    const [isfavorited, setIsFavorited]=useState<boolean>(()=>{
        const jsonValue = localStorage.getItem('favorites');
       if(jsonValue !== null){
        const favorites:orgType[] = JSON.parse(jsonValue);
        return favorites.some(f=>f.ein === einParams)
       }
       else{
        return false;
       }
    }
    )
    useEffect(()=>{
       const getOrg=async():Promise<void>=>{
        try{
          const res=await axios.get(`https://partners.every.org/v0.2/search/${einParams}?apiKey=${apiKey}`);
        //   console.log(res.data.nonprofits[0])
          setOrg(res.data.nonprofits[0]);
        }catch(err){
          console.log(err);
        }
       }
       getOrg();
    },[apiKey, einParams]);

    const navigateToHome=():void=>{
        navigate("/")
    }

    const addToFavorites=():void=>{
        
       if(org){
           const jsonValue = localStorage.getItem('favorites');
           let favorites:orgType[]=[];
           if(jsonValue !== null) {
               favorites = JSON.parse(jsonValue);
               if(favorites.find(f=>f.ein === org.ein)=== undefined) favorites.push(org);
            }else{
                favorites.push(org);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites))
       }
       setIsFavorited(true);
    }

    const removeFromFavorites=():void=>{
         if(org){
           const jsonValue = localStorage.getItem('favorites');
           if(jsonValue !== null) {
               const favorites:orgType[] = JSON.parse(jsonValue);
               const newFavorites=favorites.filter(f=>f.ein !== einParams)
               localStorage.setItem('favorites', JSON.stringify(newFavorites))
            }
         }
         setIsFavorited(false);
    }
  
    return (
      <div className="charity-detail">
        <div className="detail-top">
         <ArrowBackIcon sx={{fontSize:"40px", marginBottom:"15px"}} onClick={navigateToHome}/>
         <Link to={"/favorite"} className='detail-favorite-circle'>
           <FavoriteIcon sx={{fontSize:"30px", color:"#c24e00"}}/>
         </Link>
        </div>
        <div className="detail-content">
         <div className="detail-left">
          <h3 className="detail-title">
            <img src={org?.logoUrl ? org.logoUrl : noImage} alt="" className="detail-logo" />
            {org?.name}
          </h3>
          <span className="detail-location">
           <PlaceIcon sx={{fontSize:"18px"}} style={{color:"green", marginLeft:"-3.75px"}}/>
           {org?.location}
          </span>
          <img className="detail-img" src={org?.coverImageUrl ? org.coverImageUrl : noImage} alt="" />
          <p className="detail-desc-title">Description</p>
            {org?.description}
        </div>
          
         <div className="detail-right">
           <Link className="website-link" to={org?.profileUrl ? org.profileUrl : "/"}>
             Learn more
           </Link>
           <button className="favorite-btn" onClick={isfavorited ? removeFromFavorites :addToFavorites }>
            {isfavorited ? "Remove from favorites" : "Add to favorites"}
           </button>
           <div className="tags">
            <span className="tags-title">Tags:</span>
            <div className="tag-container">
            {org?.tags.map((t,index)=>(
                <span key={index} className="tag">{t}</span>
            ))}
            </div>
           </div>
         </div>
        </div>
      </div>
    )
}