import {useState, useEffect} from 'react';
import axios from 'axios';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import AddIcon from '@mui/icons-material/Add';

export default function MyApps () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchtext, setSearchText] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function SearchJob(e) {
        e.preventDefault();
        navigate('/applications/'.concat(searchtext,'/'));
    }
    
    function fetchMyApps () {
        axios.get('/api/myapplications/').then(
            res => {console.log(res.data);
                    setData(res.data);
                   }
        ).catch(error => {console.log(error);
                          if (error['message'] == 'Request failed with status code 401') {
                              tokenDel();
                              dispatch(logoutemail());
                              dispatch(logoutusername());
                              dispatch(logout());
                          }
                         });
    }

    useEffect( () => {
        fetchMyApps();
        setLoading(false);
    }, []);
    
    return (
        <div>
          {
              loading ?
                  <div className='grid h-screen place-items-center'>
                    <BeatLoader color="#36d7b7" size="50"/>
                  </div>
                  :                  
                  <div className='mb-12'>                    
                    <p className='flex justify-center text-bold text-xl lg:text-3xl mt-6'> My Applications  </p>                    
                                        
                    <div className='flex justify-center mt-5'>
                      {/* <button className='bg-blue-300 w-32'> <p className='text-yellow-500'> Hello </p> </button> */}
                    </div>                                           
                    {                    
                        data.length ?
                            <div>
                              <div>
                                <div class="flex items-center justify-center mt-3 mb-5">
                                  <form class="flex border-2 border-gray-200 rounded">
                                    <input type="text" class="px-4 py-2 w-40" placeholder="Search Company..." onChange={(e) => setSearchText(e.target.value)} required />
                                    <button class="px-4 text-white bg-gray-600 border-l" onClick={SearchJob}>
                                      Search
                                    </button>
                                  </form>
                                </div>
                              </div>
                              
                              {
                                  data.map(result =>
                                      <div>                                                                    
                                        <ul className="mt-3 flex flex-col items-center justify-center ">
                                          <li key={result.id} className="bg-gray-200 w-72 lg:w-1/2 border-round">
                                            <Link to={"/jobdetail/".concat(result.id)} className="flex justify-center w-auto mx-8"> <p className='mt-4 mb-4 text-green-700 hover:text-sky-400'> {result.title} - {result.company} </p> </Link>
                                          </li>                          
                                        </ul>                                  
                                      </div>
                                  )
                              }
                            </div>
                            :
                            <div>
                              <p className='flex justify-center mt-6'> You have no job applications </p>
                              {/* <AddIcon> */}
                              {/* </AddIcon> */}
                            </div>
                    }
                    <div class="flex justify-center mt-4 ">
                      <AddIcon sx={{ fontSize: 40 }} onClick={() => {navigate('/addapplication')}}>
                      </AddIcon>
                    </div>
                  </div>
          }
        </div>
    );
}
