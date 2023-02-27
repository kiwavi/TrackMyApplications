import { Link } from "react-router-dom";
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch, useSelector} from 'react-redux';
import {tokenDel} from './setToken';
import axios from "axios";
import { useState } from "react";

export default function Header () {
    const logged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();
    const [isNavOpen, setIsNavOpen] = useState(false);   
        
    function LogUserOut () {
        axios.get(
            'api/accounts/logout'
        ).then(response => {
            console.log(response.data);
            tokenDel();
            dispatch(logoutemail());
            dispatch(logoutusername());
            dispatch(logout());
        });
    }
    
    return (
        <div className="flex items-center justify-between py-8 bg-yellow-400">
          <a href="/" className="ml-3">
            TrackMyApps
          </a>
          <nav className="mr-3">
            <section className="MOBILE-MENU flex lg:hidden">
              <div
                className="HAMBURGER-ICON space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>
              
              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
                <div
                  className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-400 my-8">
                    {
                        logged ? <Link to="/home"> Home </Link>  : <p>  </p>
                    }
                  </li>
                  <li className="border-b border-gray-400 my-8">
                    {
                        logged ? <button onClick={LogUserOut}> Logout </button> : <Link to="/login"> Login </Link>
                    }
                  </li>
                  <li className="border-b border-gray-400 my-8">
                    <Link to="/about"> About </Link>
                  </li>
                </ul>
              </div>
            </section>
            
            <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
              <li>
                {
                    logged ? <Link to="/home"> Home </Link>  : <p>  </p>
                }
              </li>
              <li>
                {
                    logged ? <button onClick={LogUserOut}> Logout </button> : <Link to="/login"> Login </Link>
                }
              </li>
              <li>
                <Link to="/about"> About </Link>
              </li>
            </ul>
          </nav>
          <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </div>
        
	// <div className='bg-yellow-400 py-4'>          
        //   <div className="flex justify-between items-center">
	//     <Link to="/"> <p className='text-xl ml-3'> TrackMyApps  </p> </Link>
	//     <ul className='flex mr-3 ml-4 justify-around w-96'>
        //       <li>
        //         {
        //             logged ? <Link to="/home"> Home </Link>  : <p>  </p>
        //         }
        //       </li>
              
        //       <li>
        //         {
        //             logged ? <button onClick={LogUserOut}> Logout </button> : <Link to="/login"> Login </Link>
        //         }
	//       </li>
	//       <li>
        //         <Link to="/about"> About </Link>
	//       </li>
	//       <li>
                
	//       </li>
	//       <li>
                
	//       </li>
	//     </ul>
	//   </div>          
	// </div>
    );
}
