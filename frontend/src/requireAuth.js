import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function RequireAuth (props) {
    let navigate = useNavigate();
    const logged = useSelector((state) => state.isLogged);
    const current_pathname = window.location.pathname;

    useEffect(
        () => {
            if (!logged) {
                navigate('/login?'.concat('next=',current_pathname));
            }
        }
    );

    if (logged) {
        return (
            <div>
              {props.children}
            </div>
        );
    }    
}
