import {useEffect, useState} from 'react';
import axios from 'axios';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from 'react-router-dom';

export default function Offer () {
    const [offers, setOffers] = useState([]);
    const dispatch = useDispatch();

    function fetchOffers () {
        axios.get('api/myapplications/?feedback=Offer').then(
            res => {            
                setOffers(res.data);
            }
        ).catch(error => {console.log(error['message']);
                          if (error['message'] === 'Request failed with status code 401') {
                              fetchError();
                          }
                         });        
    }
    
    function fetchError () {
        tokenDel();
        dispatch(logoutemail());
        dispatch(logoutusername());
        dispatch(logout());
    }

    useEffect(() => {
        fetchOffers();
    },[]);

    return (
        <div>
          <p className='flex justify-center text-bold text-xl lg:text-3xl mt-6'> Companies You Have Offers With  </p>
          {
              offers.map(result =>
                  /* <li key={result.id}> */
                  /*   <Link to={"/jobdetail/".concat(result.id)} className="flex justify-center mt-8">  <p> {result.title} </p> </Link> */
                  /* </li> */

                  <ul className="mt-3 flex flex-col items-center justify-center ">
                    <li key={result.id} className="bg-gray-200 w-72 lg:w-1/2 border-round">
                      <Link to={"/jobdetail/".concat(result.id)} className="flex justify-center w-auto mx-8"> <p className='mt-4 mb-4 text-green-700 hover:text-sky-400'> {result.title} - {result.company} </p> </Link>
                    </li>                          
                  </ul>
                  
              )
          }
        </div>
    );
    
}
