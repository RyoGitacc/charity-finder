import { orgType } from '../type'
import { Link, useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import noImage from '../assets/noimage.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function FavoriteCharity() {
      let favorites:orgType[]=[]
      const jsonValue = localStorage.getItem('favorites');
        if(jsonValue !== null){
            favorites=JSON.parse(jsonValue);
        }
      const navigate = useNavigate();

  return (
    <div className='favorite-charity'>
     <ArrowBackIcon sx={{fontSize:"40px", marginBottom:"15px"}} onClick={()=>navigate('/')}/>
     <h3 className='favorite-title'>Your Favorites</h3>
     <div className='favorite-container'>
      {favorites.map((f,index)=>(
     <Link to={"/detail/" + f.ein} key={index} className='charity-card'>
        <div className='card-left'>
          <img  className="card-logo" src={f.logoUrl ? f.logoUrl : noImage} alt=""/>
        </div>
        <div className='card-right'>
           <p className='card-org-name'>{f.name}</p>
           <span className='card-location'>
             <PlaceIcon sx={{fontSize:"18px"}} style={{color:"green", marginLeft:"-3.75px"}}/>
             {f.location ? f.location : "unknown"}
           </span>
        </div>
     </Link>
      ))
      }
    </div>
    </div>
  )
}
