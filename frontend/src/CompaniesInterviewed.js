import {useEffect, useState} from 'react';
import axios from 'axios';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from 'react-router-dom';

export default function CompaniesInterviewed () {
    const [interviews, setInterviews] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    function fetchError () {
        tokenDel();
        dispatch(logoutemail());
        dispatch(logoutusername());
        dispatch(logout());
    }
    
    function fetchInterviews () {
        axios.get('api/myapplications/?interviewed=true').then(
            res => {                               
                setInterviews(res.data);
            }
        ).catch(error => {console.log(error['message']);
                          if (error['message'] === 'Request failed with status code 401') {
                              fetchError();
                          }
                         });
    }

    useEffect(() => {
        fetchInterviews();
        setLoading(false);
    });
    
    return (
        <div>
        { loading ?
          <div className='grid h-screen place-items-center'>
            <BeatLoader color="#36d7b7" size="50"/>
          </div>
          : 
          <div>
            <p className='flex justify-center mt-6 text-bold text-2xl mx-8 lg:mx-0 text-center'> Companies You Have Interviewed With </p>
            {
                interviews.map(result =>
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
        }
        </div>
    );
}
