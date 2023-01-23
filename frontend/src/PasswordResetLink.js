import {useState} from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

export default function PasswordResetLink() {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    function SendResetLink () {
        setLoading(true);
        axios.post('/api/accounts/password/reset/',{
            email,
        }).then(
            res => {
                console.log(res.data);
                setSuccess(true);
                setLoading(false);
            }
        );
    }
    
    return (
        <div>
        <div>
          {
              loading ?             
              <div className='grid h-screen place-items-center'>
                <BeatLoader color="#36d7b7" size="50"/>
              </div>
              :
              success ?
              <p className='flex justify-center text-bold mt-6 text-xl'> A reset link has been sent to {email} </p>
              :
              <div>
                <p className='flex justify-center text-2xl text-bold mt-8 mb-5'> Reset Password  </p>
                <form class="flex flex-col items-center justify-center mt-6 mb-12" onSubmit={SendResetLink}>              
                  <div class="mb-6">
                    <label for="email" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Email </label>
                    <input id="w3review" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  name="password" rows="4" cols="50" onChange={(e) => setEmail(e.target.value)}>
                    </input> 
                  </div>
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-24"> Submit </button>
                </form>
              </div>
          }
        </div>
        </div>
    );    
}
