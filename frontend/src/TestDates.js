import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function TestDates () {
    const  [from, setFrom] = useState(new Date());
    const  [to, setTo] = useState(new Date()); 

    function SubmitDates () {
        const today = new Date();
        if (to > today || from > today) {
            alert('Choose a date earlier than today');
        }

        else if (from > to) {
            alert('Please choose dates correctly');
        }

        else if ((from - to) === 0) {
            alert('Please choose a wider range!');
        }

        else {
            
        }
        
        console.log(new Date(from));
        console.log(new Date(to));
    }
    
    return (
        <div>
          <p class="text-center lg:text-right">
            Hey Man 
          </p>
          
          {/* <p className="flex justify-center text-bold text-3xl mt-6"> Hey Man </p> */}

          {/* <div className='flex justify-center mt-12'> */}
          {/*   <p className="mr-12"> From </p> */}
          {/*   <p className="ml-12"> To </p> */}
          {/* </div> */}
          
          {/* <div className='flex justify-center mt-12'> */}
          {/*   <DateTimePicker onChange={onChange} value={value} className="mr-6"  /> */}
          {/*   <DateTimePicker onChange={onChange} value={value} className="ml-6"/> */}
          {/* </div> */}

          <div className='flex justify-center mt-12'>
            <div className='flex flex-col'>
              <p className='mb-3 text-bold'> From </p>
              <DateTimePicker onChange={setFrom /* (e) => setFrom(e.target.value)*/} value={from} className="mr-6"  />
            </div>

            <div className='flex flex-col'>
              <p className='mb-3'> To </p>
              <DateTimePicker onChange={setTo} value={to} className="mr-6"  />
            </div>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 rounded px-2 mt-5' onClick={SubmitDates}>
              Filter
            </button>            
          </div>
        </div>
    );
}
