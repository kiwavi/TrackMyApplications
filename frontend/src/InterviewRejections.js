import {useEffect, useState} from 'react';
import axios from 'axios';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from 'react-router-dom';

export default function InterviewRejections () {
    const [interviewRejections, setInterviewRejections] = useState([]);
    const dispatch = useDispatch();

    function fetchError () {
        tokenDel();
        dispatch(logoutemail());
        dispatch(logoutusername());
        dispatch(logout());
    }

    function fetchInterviewedRejections () {
        axios.get('api/myapplications/?interviewed=true&feedback=Rejected').then(
            res => {
                setInterviewRejections(res.data);
            }
        ).catch(error => {console.log(error['message']);
                          if (error['message'] === 'Request failed with status code 401') {
                              fetchError();
                          }
                         });;    
    }

    useEffect(() => {
        fetchInterviewedRejections();
    },[]);
    
    return(
        <div>
          <p className='flex justify-center text-3xl text-bold mt-6'> Rejections After Interviews  </p>
          {
              interviewRejections.map(result =>
                  <li key={result.id}>
                    <Link to={"/jobdetail/".concat(result.id)} className="flex justify-center mt-8">  <p> {result.title} </p> </Link>
                  </li>)
          }
        </div>
    );
}
