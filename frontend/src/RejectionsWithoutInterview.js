import {useEffect, useState} from 'react';
import axios from 'axios';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from 'react-router-dom';

export default function RejectionsWithoutInterview() {
    const [rejections_without_interviews, setRejectionsWithoutInterviews] = useState([]);
    const dispatch = useDispatch();    

    function fetchError () {
        tokenDel();
        dispatch(logoutemail());
        dispatch(logoutusername());
        dispatch(logout());
    }
    
    function RejectionsWithoutInterviews () {
        axios.get('api/myapplications/?interviewed=false&feedback=Rejected').then(
            res => {
                setRejectionsWithoutInterviews(res.data);
            }
        ).catch(error => {console.log(error['message']);
                          if (error['message'] === 'Request failed with status code 401') {
                              fetchError();
                          }
                         });
        
    }

    useEffect(() => {
        RejectionsWithoutInterviews();
    },[]);
    
    return (
        <div>
          <p className='flex justify-center mt-6 text-2xl text-bold'> Rejections Without Interviews  </p>
          {
              rejections_without_interviews.map(result =>
                  <li key={result.id}>
                    <Link to={"/jobdetail/".concat(result.id)} className="flex justify-center mt-8">  <p> {result.title} </p> </Link>
                  </li>)
          }
        </div>
    );
    
}
