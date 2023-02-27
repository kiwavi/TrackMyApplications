import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {NotificationManager} from 'react-notifications';

export default function AddApplication() {
    const [title, setTitle] = useState(null);
    const [company, setCompany] = useState(null);
    const [apptype, setAppType] = useState('Select');
    const [description, setDescription] = useState(null);
    const [notes, setNotes] = useState(null);
    const [url, setURL] = useState(null);
    
    const user = useSelector((state) => state.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function SubmitApplication (e) {
        e.preventDefault();
        console.log(apptype);
        if (apptype === 'Select') {
            // alert('Please select an appropriate \'from\' type');
            NotificationManager.error('Please select an appropriate \'from\' type','Missing Value',2000);
        }

        else {
            axios.post('/api/myapplications/', {
                title,
                company,
                application_portal: apptype,
                job_description: description,
                notes,
                user,
                url,
            }).then(res => {
                NotificationManager.success('Application added successfully','Success',2000);
                navigate('/jobdetail/'.concat(res.data['id']));
            }).catch(error => {console.log(error['message']);
                               if (error['message'] === 'Request failed with status code 401') {
                                   tokenDel();
                                   dispatch(logoutemail());
                                   dispatch(logoutusername());
                                   dispatch(logout());
                               }
                              });
        }
    }
    
    return (
        <div>
          <p class="flex justify-center text-3xl font-bold mt-6"> Add an application  </p>
          <div> 
            <form class="flex flex-col items-center justify-center mt-6 mb-12" onSubmit={SubmitApplication}>
              <div class="mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Job title <span className='text-red-500'>*</span></label>
                <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setTitle(e.target.value)} maxLength="150" required/>
              </div>

              <div class="mb-6">
                <label for="company" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Company <span className='text-red-500'>*</span> </label>
                <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setCompany(e.target.value)} maxLength="150" required/>
              </div>

              <div class="mb-6">
                <label for="company" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> From <span className='text-red-500'>*</span> </label>
                <select class="w-80" onChange={(e) => setAppType(e.target.value)}>
                  <option key='0' value="Select"> Select </option>
                  <option key='1' value="Linkedin"> Linkedin </option>
                  <option key='2' value="Company Website"> Company Website </option>
                  <option key='3' value="Referral"> Referral </option>
                  <option key='4' value="Job Search Site"> Job Search Site </option>
                  <option key='4' value="Recruiter Call"> Recruiter Call </option>
                  <option key='4' value="Sent an email"> Sent an email </option>
                </select> 
              </div> 
              
              <div class="mb-6">
                <label for="w3review" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Job Description </label>
                <textarea id="w3review" className='w-80'  name="w3review" rows="4" cols="50" onChange={(e) => setDescription(e.target.value)}>
                </textarea> 
              </div>

              <div class="mb-6">
                <label for="notes" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Notes </label>
                <textarea id="w3review" className='w-80'  name="notes" rows="4" cols="50" onChange={(e) => setNotes(e.target.value)}>
                </textarea> 
              </div>

              <div class="mb-6">
                <label for="url" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> URL </label>
                <input type="url" id="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setURL(e.target.value)} maxLength="400"/>
              </div>
              
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Submit </button>
            </form>
          </div>
        </div>
    );
}
