import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tokenSet } from './setToken';
import { login,logusername,logemail } from './redux/logged';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {NotificationManager} from 'react-notifications';
import BeatLoader from "react-spinners/BeatLoader";

export default function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logged = useSelector((state) => state.isLogged);
    
    function SubmitLogin (e) {
        e.preventDefault();
        
        if (logged) {
            NotificationManager.warning('You are logged in already','Logged',2000);
        }

        else {
            axios.post(
                'api/accounts/login/',
                {
                    email,
                    password
                }
            ).then(
                response => {
                    console.log(response.data["token"]);
                    const token = response.data["token"];
                    tokenSet(token);
                    axios.get(
                        'api/accounts/users/me/'
                    ).then(response => {
                        console.log(response.data['email']);
                        console.log(response.data['first_name']);                    
                        dispatch(login());
                        dispatch(logusername(response.data['first_name']));
                        dispatch(logemail(response.data['email']));
                        NotificationManager.success('Successful login','Login success',2000);
                        if (window.location.href.includes('next')) {
                            const curr_url = new URL(window.location.href);
                            const next_url = curr_url.searchParams.get('next');
                            navigate(next_url);
                        }
                        else {
                            navigate('/home');
                        }
                    });
                }
            ).catch(
                error => {
                    console.log(error);
                    if (error.message === "Request failed with status code 401") {
                        // alert('Wrong credentials.');
                        NotificationManager.error('You have entered wrong credentials','Wrong credentials',2000);
                    }
                    if (error.message === "Network Error") {
                        NotificationManager.error('There was an internal server error','Server error',2000);
                    }
                }
            );
        }
    }

    
    return (
        <div>
          <p class="flex justify-center text-bold text-3xl mt-6"> Login  </p>
	  <div class="flex justify-center mt-12">
	    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={SubmitLogin}>
	      <div class="mb-4">
	        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
	        </label>
	        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
	      </div>
	      <div class="mb-6">
	        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
		  Password
	        </label>
	        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
	      </div>
	      <div class="flex items-center justify-between">
	        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Submit"/>
                <Link to="/signup"> <p className="text-green-700"> Signup  </p> </Link>
	      </div>
              <Link to="/password/link"> <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-3"> Forgot Password? </p>  </Link>
	    </form>
	  </div>
        </div>
    );    
}
