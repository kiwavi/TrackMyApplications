import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Footer () {
    const [year, setYear] = useState(0);

    useEffect(() => {
        var year = new Date().getFullYear();
        setYear(year);
    });
    
    return (
        <div className="w-full bg-gray-700 py-8">
          <Link class="flex justify-center" to="/contact-us" style={{ textDecoration: 'none' }}> <p className='text-white hover:text-sky-400'> Contact Us </p> </Link>
          <p class="flex justify-center text-white"> © Copyright {year} </p>
        </div>
    );
}
