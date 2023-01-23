import {useParams} from 'react-router-dom';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {useState, useEffect} from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from 'react-router-dom';

export default function SearchJob() {
    const searchParams = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    
    function fetchJob () {
        axios.get('/api/myapplications/?company='.concat(searchParams.term)).then(
            res => {
                console.log(res.data);
                setData(res.data);
            }
        ).catch(error => {
                console.log(error);
                if (error['message'] === 'Request failed with status code 401') {                 
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchJob();
    },[]);
    
    return (
        <div>
          { loading ?
            <div className='grid h-screen place-items-center'>
              <BeatLoader color="#36d7b7" size="50"/>
            </div>
            :
            <div>
              <p className='flex justify-center mt-6 text-bold text-2xl'> Results for '{searchParams.term}' </p>
              {
                  data.length ?            
                      data.map(result =>                
                          <ul className="mt-3 flex flex-col items-center justify-center mt-8">
                            <li key={result.id} className="bg-gray-200 w-72 lg:w-1/2 border-round">
                              <Link to={"/jobdetail/".concat(result.id)} className="flex justify-center w-auto mx-8"> <p className='mt-4 mb-4 text-green-700 hover:text-sky-400'> {result.title} - {result.company} </p> </Link>
                            </li>                          
                          </ul>
                      )
                  :
                  <p>
                    Hey Man. No Results Found
                  </p>
              }
            </div>
          }
        </div>
    );    
}
