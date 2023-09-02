import { useEffect, useState } from 'react'
import noImage from '../assets/noimage.png'
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AxiosReturnOrgType, orgType } from '../type';

type CharityListProps={
  cause:string
}

export default function CharityList({cause}:CharityListProps) {
const [orgs,setOrgs]=useState<orgType[]>([])
const apiKey= import.meta.env.VITE_API_KEY;

useEffect(()=>{
  const getData=async():Promise<void>=>{
      const orgs = await axios.get<AxiosReturnOrgType>(`https://partners.every.org/v0.2/search/${cause}?apiKey=${apiKey}&take=21`);
      
      setOrgs(orgs.data.nonprofits)
  }
  if(cause) getData();
},[apiKey, cause])


  return (
    <div className='charity-list'>
      { orgs.length !== 0 ?
         orgs.map((o,index)=>(
          <Link to={"/detail/" + o.ein} key={index} className='charity-card'>
           <div className='card-left'>
             <img  className="card-logo" src={o.logoUrl ? o.logoUrl : noImage} alt=""/>
           </div>
           <div className='card-right'>
              <p className='card-org-name'>{o.name}</p>
              <span className='card-location'>
                <PlaceIcon sx={{fontSize:"18px"}} style={{color:"green", marginLeft:"-3.75px"}}/>
                {o.location ? o.location : "unknown"}
              </span>
           </div>
        </Link>
        ))
        :
        <div>no result</div>
      }
    </div>
  )
}
