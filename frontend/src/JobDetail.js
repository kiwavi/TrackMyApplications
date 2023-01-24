import {useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function JobDetail () {
    const [title, setTitle] = useState(null);
    const [company, setCompany] = useState(null);
    const [description, setDescription] = useState(null);
    const [notes, setNotes] = useState(null);
    const [application_portal, setPortal] = useState(null);
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('None');
    const [interviewed, setInterview] = useState(false);
    const [timedifference, setTimeDifference] = useState(0);
    const [spam, setSpam] = useState(false);
    const [url, setURL] = useState(null);
    
    const [notes_opened, setNotesOpened] = useState(false);
    const [description_opened, setDescriptionOpened] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const searchParams = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.email);
    
    function getJobDetail () {
        axios.get('/api/myapplications/'.concat(searchParams.id,'/'))
            .then(res => {
                console.log(res.data);
                setTitle(res.data['title']);
                setCompany(res.data['company']);
                setPortal(res.data['application_portal']);
                setDate(res.data['application_date']);
                setStatus(res.data['final_feedback']);
                if (res.data['notes']) {
                    setNotes(res.data['notes']);
                }
                if (res.data['job_description']) {
                    setDescription(res.data['job_description']);
                }
                if (res.data['interviewed']) {
                    setInterview(res.data['interviewed']);
                }
                if (res.data['url']) {
                    setURL(res.data['url']);
                }
                const now = new Date();
                const jobdate = new Date(res.data['application_date']);
                const difference = (now - jobdate) / 1000;
                setTimeDifference(difference);
                
            }).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {                 
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }
    
    useEffect(() => {
        getJobDetail();
        setLoading(false);
    }, []);

    function DeleteJob() {
        axios.delete('api/myapplications/'.concat(searchParams.id,'/'))
            .then(
                res => {
                    console.log(res.data);
                    navigate('/myapplications');
                }
            ).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }


    function SubmitInterviewed() {
        axios.put('api/myapplications/'.concat(searchParams.id,'/'),{
            interviewed: 'true',
            user: user,
            title,
            company,
            application_portal,
            notes,
            job_description: description,
            url,
        })
            .then(res => {
                console.log(res.data);
                setInterview(true);
            }).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }

    function SubmitOffer () {
        if (interviewed == false) {
            alert('Ensure that you have indicated that you have interviewed with them first!');
        }

        else {
            axios.put('api/myapplications/'.concat(searchParams.id,'/'),{
                final_feedback: 'Offer',
                interviewed,
                user: user,
                title,
                company,
                application_portal,
                notes,
                job_description: description,
                url,
            })
                .then(res => {
                    console.log(res.data);
                    setStatus('Offer');
                }).catch(error => {
                    console.log(error);
                    if (error['message'] == 'Request failed with status code 401') {
                        tokenDel();
                        dispatch(logoutemail());
                        dispatch(logoutusername());
                        dispatch(logout());
                    }
                });
        }
    }

    function SubmitRejection () {
        axios.put('api/myapplications/'.concat(searchParams.id,'/'),{
            final_feedback: 'Rejected',
            interviewed,
            user: user,
            title,
            company,
            application_portal,
            notes,
            job_description: description,
            url,
        })
            .then(res => {
                console.log(res.data);
                setStatus('Rejected');
            }).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }

    function SubmitScam () {
        axios.put('api/myapplications/'.concat(searchParams.id,'/'),{
            final_feedback: status,
            interviewed,
            user: user,
            title,
            company,
            application_portal,
            notes,
            job_description: description,
            spam: 'true',
            url,
        })
            .then(res => {
                console.log(res.data);
                navigate('/myapplications');
            }).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }

    function OpenNotes() {
        setNotesOpened(!notes_opened);
    }

    function OpenDescription() {
        setDescriptionOpened(!description_opened);
    }
    
    function SubmitNewNotes (e) {
        e.preventDefault();
        axios.put('api/myapplications/'.concat(searchParams.id,'/'),{
            final_feedback: status,
            interviewed,
            user,
            title,
            company,
            application_portal,
            notes,
            job_description: description,
            spam,
            url,
        })
            .then(res => {
                console.log(res.data);
                alert('Notes updated!')
            }).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }


    function SubmitNewDescription (e) {
        e.preventDefault();
        axios.put('api/myapplications/'.concat(searchParams.id,'/'),{
            final_feedback: status,
            interviewed,
            user,
            title,
            company,
            application_portal,
            notes,
            job_description: description,
            spam,
            url,
        })
            .then(res => {
                console.log(res.data);
                alert('Description updated!')
            }).catch(error => {
                console.log(error);
                if (error['message'] == 'Request failed with status code 401') {
                    tokenDel();
                    dispatch(logoutemail());
                    dispatch(logoutusername());
                    dispatch(logout());
                }
            });
    }
    
    
    return (
        <div>
        { loading ?
          <div className='grid h-screen place-items-center'>
            <BeatLoader color="#36d7b7" size="50"/>
          </div>
          
          :
          
          <div>
            <p className='flex justify-center mt-6 text-bold text-2xl mx-8 lg:mx-0'> {title} at {company} </p>
              {
                  timedifference < 60 ? <p className='flex justify-center mt-4 text-green-600'> Seconds ago </p> : timedifference > 60 && timedifference <= 3600 ? <p className='flex justify-center mt-4 text-green-600'> {Math.trunc(timedifference / 60)} {Math.trunc(timedifference / 60) > 1 ? <p className='inline text-green-600'> &nbsp;minutes ago</p> : <p className='inline text-green-600'> &nbsp;minute ago </p>} </p> : timedifference > 3600 && timedifference < 86400 ? <p className='flex justify-center mt-4 text-green-600'> {Math.trunc(timedifference / 3600)} {Math.trunc(timedifference / 3600) > 1 ? <p className='text-green-600'> &nbsp;hours ago  </p> : <p className='inline text-green-600'> &nbsp;hour ago </p>}  </p> : timedifference > 86400 && timedifference < 604800 ? <p className='flex justify-center mt-4'> <p className='inline text-green-600'> {Math.trunc(timedifference / 86400)} </p> {Math.trunc(timedifference / 86400) > 1 ? <p className='inline text-green-600'> &nbsp;days ago </p> : <p className='inline text-green-600'> &nbsp;day ago </p>} </p> : timedifference > 604800 && timedifference < 31536000 ? <p className='flex justify-center mt-4'> <p className='text-green-600'> {Math.trunc(timedifference / 604800)} </p> {Math.trunc(timedifference / 604800) > 1 ? <p className='inline text-green-600'> &nbsp;weeks ago </p> : <p className='inline text-green-600'> &nbsp;week ago </p>} </p> : timedifference > 31536000 ? <p className='flex justify-center mt-4 text-green-600'> {Math.trunc(timedifference / 31536000)} {Math.trunc(timedifference / 31536000) > 1 ? <p className='inline text-green-600'> &nbsp;years ago </p> : <p className='inline text-green-600'> &nbsp;year ago </p>} </p> : <p> Nothing </p>
              }
            
            <div className='flex flex-col justify-center items-center'>
              <p class="mt-4 text-bold text-lg w-80 bg-gray-400 text-center lg:w-1/2"> Description </p>
              
              {
                  description ? <div className="flex flex-col justify-center items-center">
                                  {description.length > 88 ? <p className='mx-4 mt-4 lg:w-1/2'> {description} </p> :
                                   <p className='mx-4 mt-4 lg:w-1/2 lg:text-center'> {description} </p>}
                                </div> :
                  <p className='mx-4 mt-4'> None </p>
              }                            
              
              <p class="mt-4 text-bold text-lg w-80 bg-gray-400 text-center lg:w-1/2"> Application type </p>
              <p className='mx-4 mt-4'> {application_portal}  </p>
              
              <p class="mt-4 text-bold text-lg w-80 bg-gray-400 text-center lg:w-1/2"> Interviewed </p>
              {
                  interviewed ? <p className='mx-4 mt-4'> Yes </p> : <p className='mx-4 mt-4'> No </p>
              }
              
              <p class="mt-4 text-bold text-lg w-80 bg-gray-400 text-center lg:w-1/2"> Notes </p>
              {
                  notes ? <p className='mx-4 mt-4 lg:w-1/2 text-center'> {notes} </p> : <p className='mx-4 mt-4'> None </p>
              } 
              
              <p class="mt-4 text-bold text-lg w-80 bg-gray-400 text-center lg:w-1/2"> Final Feedback </p>
              {
                  status == 'Offer' ? <p className='mx-4 mt-4'> Offer </p> : status == 'Rejected' ? <p className='mx-4 mt-4'> Rejected </p> : <p className='mx-4 mt-4'> None </p>
              }
              
              <p class="mt-4 text-bold text-lg w-80 bg-gray-400 text-center lg:w-1/2"> URL </p>
              {
                  url ? <p className='mt-4 lg:w-1/2 mb-6'> <a href={url} target="_blank" className='lg:text-center'> <p className='text-green-400 text-center mx-4'> {url} </p> </a>  </p> : <p className='mx-4 mt-4'> None </p>
              }
            </div>                        
            
            <div class="flex justify-center mt-6">
              <button onClick={OpenDescription} className="w-36 bg-gray-300 mr-10 lg:w-80">
                Edit description
              </button>
              
              <EditIcon sx={{ fontSize: 32 }} color="success" onClick={OpenDescription}>                                
              </EditIcon>
            </div>                       
            
            {
                description_opened ?
                    <form class="flex flex-col items-center justify-center mt-6" onSubmit={SubmitNewDescription}>
                      <div class="mb-6">
                        <label for="notes" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Description </label>
                        <textarea id="w3review" className='w-80'  name="notes" rows="4" cols="50" value={description}  onChange={(e) => setDescription(e.target.value)}>
                        </textarea> 
                      </div>
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-24"> Submit </button>
                    </form>
                :
                <p> </p>
            }
            
            <div>              
              <div class="flex justify-center mt-6">
                <button onClick={OpenNotes} className="w-36 bg-gray-300 mr-10 lg:w-80">
                  Edit Notes
                </button>

                <EditIcon sx={{ fontSize: 32 }} color="success" onClick={OpenNotes}>

                </EditIcon>
              </div>
            </div>
            
            {
                notes_opened ?
                    <form class="flex flex-col items-center justify-center mt-6" onSubmit={SubmitNewNotes}>
                      <div class="mb-6">
                        <label for="notes" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Notes </label>
                        <textarea class="w-80" id="w3review" name="notes" rows="4" cols="50" value={notes}  onChange={(e) => setNotes(e.target.value)}>
                        </textarea> 
                      </div>
                      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-24"> Submit </button>
                    </form>
                :
                <p> </p>
            }

            <div class="flex justify-center mt-6 mx-6">
              <button className='w-36 bg-gray-300 mr-10 lg:w-80' onClick={DeleteJob}>
                Delete
              </button>                
              
              <DeleteIcon onClick={DeleteJob} sx={{ fontSize: 32, color: "red" }}>
              </DeleteIcon>              
            </div>
            
                        
            { status == 'None' ?
              <div>
                <div class="flex justify-center mt-6">
                  <button onClick={SubmitOffer} className="bg-green-500 w-36 lg:w-52 lg:py-3">
                    I received an offer!
                  </button>                  
                </div>
                
                <div class="flex justify-center mt-6 mb-8">
                  <button onClick={SubmitRejection} className="bg-red-400 w-36 lg:w-52 lg:py-3">
                    I received a rejection
                  </button>
                </div>
                
                {
                    interviewed ? <p> </p> :
                    <div class="flex justify-center mt-6">
                      <button onClick={SubmitInterviewed} className="bg-blue-400 w-36 lg:w-52 lg:py-3">
                        I did an interview!
                      </button>
                    </div>
                }
                
                
                <div class="flex justify-center mt-6 mb-8">
                  <button onClick={SubmitScam} className="bg-pink-500 w-36 lg:w-52 lg:py-3">
                    It was a scam(will be deleted)
                  </button>
                </div>
                
              </div>            
              
              :

              <div>
                
              </div>            
            }
          </div>
        }
        </div>
    );
}
