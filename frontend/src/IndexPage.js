import React from 'react';
import FrontImage from './frontimage.jpg';

export default function IndexPage () {
    return (
        <div>
          <p class="flex justify-center text-bold mt-3 text-2xl"> Track My Applications  </p>
          <p class="flex justify-center text-sm lg:text-lg mt-6 mx-3 lg:mx-0 text-center"> Tracking the job search and interviewing process made easier and faster! </p>
          <p class="flex justify-center mx-4 text-bold text-2xl mt-4"> Features </p>
          
          <div className='w-auto mt-4'>
            <img src={FrontImage} class="object-scale-down max-w-full h-auto" alt="..."/>
          </div>

          <div className="mt-4">
            <ol className='flex justify-center w-auto ml-5 lg:w-auto'>
              <li class="mt-2 text-sm lg:text-lg w-36 lg:w-96 lg:text-start lg:ml-40"> No Spreadsheets </li>
              <li class="mt-2 text-sm lg:text-lg w-36 lg:w-96 lg:text-start"> Take Notes </li>
            </ol>
            
            <ol className='flex justify-center w-auto ml-5'>
              <li class="mt-2 text-sm lg:text-lg w-36 lg:w-96 lg:text-start lg:ml-40"> Personalized, Dynamic Statistics </li>
              <li class="mt-2 text-sm lg:text-lg w-36 lg:w-96 lg:text-start"> Search for Applications </li>
            </ol>
                        
            <ol className='flex justify-center w-auto ml-5'>
              <li class="mt-2 text-sm w-36 lg:text-lg lg:w-96 lg:text-start lg:ml-40"> Search for Applications </li>
              <li class="mt-2 text-sm w-36 lg:text-lg lg:w-96 lg:text-start"> Important links and resources </li>
            </ol>            
          </div>                    
        </div>
    );
}
