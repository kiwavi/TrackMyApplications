import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import BeatLoader from "react-spinners/BeatLoader";
import {useState, useEffect} from 'react';
import axios from 'axios';


export default function Home () {
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState([]);
    
    const username = useSelector((state) => state.firstname);
    const navigate = useNavigate();

    function AddApp() {
        navigate('/addapplication');
    }

    function MyApps () {
        navigate('/myapplications');
    }

    function SeeStats () {
        navigate('/mystats');
    }

    function fetchLinks() {
        axios.get('/api/links').then(
            res => {
                setLinks(res.data);
                console.log(res.data);
            }  
        ).catch(
            error => {
                alert('There was an error');
            }
        );
        setLoading(false);
    }


    useEffect(() => {
        fetchLinks();
    },[]);
    
    return (
        <div>
          {
              loading ?
              <div className='grid h-screen place-items-center'>
                <BeatLoader color="#36d7b7" size="50"/>
              </div>
              : <div>
                  <p className='flex justify-center mt-6 text-bold text-xl'> Welcome, {username} </p>
                  <div class="flex justify-center mt-12 justify-around">
                    <button class="bg-pink-400 w-40" onClick={AddApp}>
                      Add Application
                    </button>
                    
                    <AddIcon onClick={AddApp}>
                    </AddIcon>            
                  </div>
                  
                  <div class="flex justify-center mt-12 justify-around">
                    <button class="bg-pink-400 w-40" onClick={MyApps}>
                      My Applications
                    </button>
                    
                    <ListIcon onClick={MyApps}>
                    </ListIcon>
                    
                  </div>
                  
                  <div class="flex justify-center mt-12 justify-around">
                    <button class="bg-pink-400 w-40" onClick={SeeStats}>
                      My Stats
                    </button>
                    
                    <ListIcon onClick={SeeStats}>
                    </ListIcon>
                  </div>                 
                  <p className='flex justify-center mt-8 text-lg'> Important links </p>
                  <div className='mb-12'>
                    { links.length ? 
                      links.map(result =>
                          <div className='mt-5'>
                            <ul className="mt-3 flex flex-col items-center justify-center">
                              <li key={result.id} className="bg-gray-200 w-72 lg:w-1/2 border-round">
                                <a href={result.url} target="_blank"> <p className='mt-4 mb-4 text-green-700 hover:text-sky-400 text-center mx-2 lg:mx-0'> {result.description} </p> </a>
                              </li>
                            </ul>
                          </div>                          
                      )
                      :
                      <p className="flex justify-center text-xl text-bold"> There are no links </p>
                    }
                  </div>
                </div>
          }
        </div>
    );
}
