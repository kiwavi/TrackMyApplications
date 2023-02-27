import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import {NotificationManager} from 'react-notifications';

export default function Signup() {
    const [email, setEmail] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const logged = useSelector((state) => state.isLogged);
    
    function SubmitSignup (e) {
        e.preventDefault();
        if (logged) {
            // alert('You have an account logged in already!');
            NotificationManager.warning('You have an account logged in already','Logged in',2000);
        }

        if (password.length < 8) {
            NotificationManager.error('Please enter a password with more than 8 characters');
        }
        
        else {        
            axios.post(
                'api/accounts/signup/',
                {
                    email,
                    password,
                    first_name,
                    last_name
                }
            ).then(
                response => {
                    NotificationManager.success('You have successfully created an account. Now please login.');
                    navigate('/login');
                }
            ).catch(
                error => {
                    if (error['message'] === 'Request failed with status code 400') {
                        NotificationManager.error('The email exists','Email exists',2000);
                    }
                }
            );
        }
    }
    
    return (
        <div>
          <p class="flex justify-center text-bold text-3xl mt-6"> Signup  </p>
	  <div class="flex justify-center mt-12">
	    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={SubmitSignup}>
	      <div class="mb-4">
	        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
	        </label>
	        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
	      </div>
              <div class="mb-4">
	        <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
                  First Name
	        </label>
	        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" onChange={(e) => setFirstName(e.target.value)} required/>
	      </div>
              <div class="mb-4">
	        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                  Last Name
	        </label>
	        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" onChange={(e) => setLastName(e.target.value)} required/>
	      </div>
	      <div class="mb-6">
	        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
		  Password
	        </label>
	        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
	      </div>
	      <div class="flex items-center justify-between">
	        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Submit"/>
                <Link to="/login"> <p className="text-green-700"> Login </p> </Link>
	      </div>
	    </form>
	  </div>
        </div>
    );    
}





// -----------------------------25708179593366981755931986018
// Content-Disposition: form-data; name="csrfmiddlewaretoken"

// Lj806mKBWJobiIXVMvmtfFlfXlRupw3loFQ6DI4BrDsmUpVSJhWV2XDoy6Dn2VjZ
// -----------------------------25708179593366981755931986018
// Content-Disposition: form-data; name="email"

// soul@soul.com
// -----------------------------25708179593366981755931986018
// Content-Disposition: form-data; name="password"

// Soulsister
// -----------------------------25708179593366981755931986018
// Content-Disposition: form-data; name="first_name"

// Soul
// -----------------------------25708179593366981755931986018
// Content-Disposition: form-data; name="last_name"

// Sister
// -----------------------------25708179593366981755931986018--
