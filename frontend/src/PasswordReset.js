import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from 'react-router-dom';

export default function PasswordReset () {
    const [password, setPassword] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [code, setCode] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const searchParams = useParams();
    
    function AddCode () {
        setCode(searchParams.code);
    }

    function submitNewPassword (e) {
        e.preventDefault();
        if (password === password2) {
            setLoading(true);
            axios.get('/api/accounts/password/reset/verify/?code='.concat(code)).then(
                res => {
                    console.log(res.data['success']);
                    if (res.data['success'] === 'Email address verified.') {
                        axios.post('api/accounts/password/reset/verified/', {
                            code,
                            password,
                        }).then(
                            res => {
                                console.log(res.data);
                                setSuccess(true);
                                setLoading(false);
                            }
                        ).catch(
                            error => {
                                console.log(error['message']);
                                setLoading(false);
                                setError(true);
                            }
                        );
                    }
                }
            ).catch(
                error => {
                    setLoading(false);
                    setError(true);
                }
            );
        }

        else {
            alert('Passwords do not match!');
        }
    }
    
    useEffect(() => {
        AddCode();
    });
    
    return (
        <div>
          <div>
            {
                loading ?
                <div className='grid h-screen place-items-center'>
                  <BeatLoader color="#36d7b7" size="50"/>
                </div>
                    :
                    success
                    ?
                    <p className='flex justify-center text-2xl text-bold mt-8 mb-5'> You have successfully reset your password. <Link to="/login" className='inline'> <p className='inline text-green-500'> &nbsp;Login </p> </Link> </p>
                :
                error ?
                <p className='flex justify-center text-bold mt-6 text-xl'>
                  There was an error
                </p>
                :
                <div>
                  <p className='flex justify-center text-2xl text-bold mt-8 mb-5'> Reset your password </p>

                  <form class="flex flex-col items-center justify-center mt-6 mb-12" onSubmit={submitNewPassword}>
                    <div class="mb-6">
                      <label for="password" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Password </label>
                      <input id="w3review" type="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  name="password" onChange={(e) => setPassword(e.target.value)}>
                      </input> 
                    </div>

                    <div class="mb-6">
                      <label for="password2" className='block mb-2 text-sm font-medium text-blue-900 dark:text-blue'> Password Again </label>
                      <input id="w3review" type="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="password" onChange={(e) => setPassword2(e.target.value)}>
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
