import {useEffect, useState} from 'react';
import axios from 'axios';
import {tokenDel} from './setToken';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import DateTimePicker from 'react-datetime-picker';
import {Link} from 'react-router-dom';

export default function MyStats () {
    const [allapps, setAllApps] = useState(0);
    const [interviews, setInterviews] = useState(0);
    const [offers, setOffers] = useState(0);
    const [rejected_interviews, setRejectedInterviews] = useState(0);    
    const [rejected_without_interviews, setRejectedWithoutInterviews] = useState(0);
    const [yet_to_interview, setYetToInterview] = useState(0);
    const [loading, setLoading] = useState(true);

    const [success_rate_interviews, setSuccessRateInterviews] = useState(0);
    const [interview_rate, setInterviewRate] = useState(0); 
    const [rejected_without_interviews_rate, setRejectedWithoutInterviewRate] = useState(0);
    const [yet_to_hear_rate, setYetToHearRate] = useState(0);

    const [linkedinapps, setLinkedinApps] = useState(0);
    const [comp_web, setCompWeb] = useState(0);
    const [referrals, setReferrals] = useState(0);
    const [jobsite, setJobSite] = useState(0);
    const [recruiter, setRecruiter] = useState(0);
    const [sent_emails, SetSentEmails] = useState(0);
    
    const [linkedin_interviews, setLinkedinInterviews] = useState(0);
    const [company_website_interviews, setCompanyWebsiteInterviews] = useState(0);
    const [referrals_interviews, setReferralInterviews] = useState(0);
    const [jobsite_interviews, setJobSiteInterviews] = useState(0);
    const [recruiter_interviews, setRecruiterIntterviews] = useState(0);
    const [email_interviews, setEmailInterviews] = useState(0);
    
    const [linkedin_interview_rates, setLinkedinInterviewRates] = useState(0);
    const [company_website_interview_rates, setCompanyWebsiteInterviewRates] = useState(0);
    const [referrals_interview_rates, setReferralsInterviewRates] = useState(0);
    const [jobsite_interview_rates, setJobsiteInterviewRates] = useState(0);
    const [recruiter_interview_rates, setRecruiterInterviewRates] = useState(0);
    const [sent_email_interview_rates, setSentEmailInterviewRates] = useState(0);

    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [dates_changed, setDatesChanged] = useState(false);    
    const dispatch = useDispatch();


    function SubmitDates () {        
        const today = new Date();
        if (to > today || from > today) {
            alert('Choose a date earlier than today');
            return;
        }

        else if (from > to) {
            alert('Please choose dates correctly');
            return;
        }

        else if ((from - to) === 0) {
            alert('Please choose a wider range!');
            return;
        }

        else {            
            setDatesChanged(true);
            setLoading(true);
            FetchAllApps();
            fetchInterviews();
            RejectionsWithoutInterviews();
            fetchInterviewedRejections();
            fetchOffers();
            YetToInterview();
            fetchApplicationTypes();
            fetchApplicationTypeInterviews();
            Calculations();
            setLoading(false);
        }       
    }    
    
    function fetchApplicationTypeInterviews () {        
        if (dates_changed) {
            axios.get('api/myapplications/?application=Linkedin&interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setLinkedinInterviews(res.data.length);
                    }
                    else {
                        setLinkedinInterviews(0);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Job%20Search%20Site&interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setJobSiteInterviews(res.data.length);
                    }
                    else {
                        setJobSiteInterviews(0);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Referral&interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setReferralInterviews(res.data.length);
                    }
                    else {
                        setReferralInterviews(0);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Recruiter%20Call&interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setRecruiterIntterviews(res.data.length);
                    }
                    else {
                        setRecruiterIntterviews(0);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Company%20Website&interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setCompanyWebsiteInterviews(res.data.length);
                    }
                    else {
                        setCompanyWebsiteInterviews(0);
                    }
                }
            );

            axios.get('/api/myapplications/?application=Sent%20an%20email&interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setEmailInterviews(res.data.length);
                    }
                    else {
                        setEmailInterviews(0);
                    }
                }
            );
        }
        
        else {
            axios.get('api/myapplications/?application=Linkedin&interviewed=true').then(
                res => {
                    if (res.data.length) {
                        setLinkedinInterviews(res.data.length);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Job%20Search%20Site&interviewed=true').then(
                res => {
                    if (res.data.length) {
                        setJobSiteInterviews(res.data.length);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Referral&interviewed=true').then(
                res => {
                    if (res.data.length) {
                        setReferralInterviews(res.data.length);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Recruiter%20Call&interviewed=true').then(
                res => {
                    if (res.data.length) {
                        setRecruiterIntterviews(res.data.length);
                    }
                }
            );
            
            axios.get('api/myapplications/?application=Company%20Website&interviewed=true').then(
                res => {
                    if (res.data.length) {
                        setCompanyWebsiteInterviews(res.data.length);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Sent%20an%20email&interviewed=true').then(
                res => {
                    if (res.data.length) {
                        setEmailInterviews(res.data.length);
                    }
                }
            );
            
        }
    }
    
    function fetchApplicationTypes () {
        if (dates_changed) {
            axios.get('api/myapplications/?application=Linkedin'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setLinkedinApps(res.data.length);
                    }
                    else {
                        setLinkedinApps(0);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Job%20Search%20Site'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setJobSite(res.data.length);
                    }
                    else {
                        setJobSite(0);
                    }
                }
            );
            
            
            axios.get('/api/myapplications/?application=Referral'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setReferrals(res.data.length);
                    }
                    else {
                        setReferrals(0);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Recruiter%20Call'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setRecruiter(res.data.length);
                    }
                    else {
                        setRecruiter(0);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Company%20Website'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setCompWeb(res.data.length);
                    }
                    else {
                        setCompWeb(0);
                    }
                }
            );

            axios.get('/api/myapplications/?application=Sent%20an%20email'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        SetSentEmails(res.data.length);
                    }
                    else {
                        SetSentEmails(0);
                    }
                }
            );            
        }

        else {
            axios.get('api/myapplications/?application=Linkedin').then(
                res => {
                    if (res.data.length) {
                        setLinkedinApps(res.data.length);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Job%20Search%20Site').then(
                res => {
                    if (res.data.length) {
                        setJobSite(res.data.length);
                    }
                }
            );
            
            
            axios.get('/api/myapplications/?application=Referral').then(
                res => {
                    if (res.data.length) {
                        setReferrals(res.data.length);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Recruiter%20Call').then(
                res => {
                    if (res.data.length) {
                        setRecruiter(res.data.length);
                    }
                }
            );
            
            axios.get('/api/myapplications/?application=Company%20Website').then(
                res => {
                    if (res.data.length) {
                        setCompWeb(res.data.length);
                    }
                }
            );

            axios.get('/api/myapplications/?application=Sent%20an%20email').then(
                res => {
                    if (res.data.length) {
                        SetSentEmails(res.data.length);
                    }
                }
            );            
        }
    }
    
    function fetchError () {
        tokenDel();
        dispatch(logoutemail());
        dispatch(logoutusername());
        dispatch(logout());
    }

    function Calculations () {
        const result = (offers / interviews) * 100; // number of offers based on interviews
        if (isNaN(result)) {
            setSuccessRateInterviews(0);
        }

        else {
            setSuccessRateInterviews(Math.trunc(result));
        }
        
        const result2 = (interviews / allapps) * 100; // number of interviews based on applications
        setInterviewRate(Math.trunc(result2));
        const result3 = (rejected_without_interviews / allapps) * 100; // number of rejections without interviews        
        setRejectedWithoutInterviewRate(Math.trunc(result3));
        const result4 = (yet_to_interview / allapps) * 100; // number of companies that we have not heard back from
        setYetToHearRate(Math.trunc(result4));

        const result5 = (recruiter_interviews / recruiter) * 100;
        if (isNaN(result5)) {
            setRecruiterInterviewRates(0);
        }

        else {
            setRecruiterInterviewRates(Math.trunc(result5));
        }

        
        const result6 = (linkedin_interviews / linkedinapps) * 100;
        if (isNaN(result6)) {
            setLinkedinInterviewRates(0);
        }
        
        else {
            setLinkedinInterviewRates(Math.trunc(result6));
        }

        const result7 = (company_website_interviews / comp_web) * 100;
        if (isNaN(result7)) {
            setCompanyWebsiteInterviewRates(0);
        }
        
        else {
            setCompanyWebsiteInterviewRates(Math.trunc(result7));
        }

        const result8 = (jobsite_interviews / jobsite) * 100;
        if (isNaN(result8)) {
            setJobsiteInterviewRates(0);
        }
        
        else {
            setJobsiteInterviewRates(Math.trunc(result8));
        }


        const result9 = (referrals_interviews / referrals) * 100;
        if (isNaN(result9)) {
            setReferralsInterviewRates(0);
        }
        
        else {
            setRecruiterInterviewRates(Math.trunc(result9));
        }

        const result10 = (email_interviews / sent_emails) * 100;
        if (isNaN(result10)) {
            setSentEmailInterviewRates(0);
        }

        else {
            setSentEmailInterviewRates(Math.trunc(result10));
        }  // now write number of sent emails and number of sent email interview rates
    }
    
    function YetToInterview () {
        if (dates_changed) {
            axios.get('api/myapplications/?interviewed=false&feedback=None'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setYetToInterview(res.data.length);
                    }                    
                    else {
                        setYetToInterview(0);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }

        else {
            axios.get('api/myapplications/?interviewed=false&feedback=None').then(
                res => {
                    if (res.data.length) {
                        setYetToInterview(res.data.length);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }
    }
    
    function RejectionsWithoutInterviews () {
        if (dates_changed) {
            axios.get('api/myapplications/?interviewed=false&feedback=Rejected'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setRejectedWithoutInterviews(res.data.length);
                    }
                    else {
                        setRejectedWithoutInterviews(0);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }

        else {        
            axios.get('api/myapplications/?interviewed=false&feedback=Rejected').then(
                res => {
                    if (res.data.length) {
                        setRejectedWithoutInterviews(res.data.length);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }
    }
    
    function fetchInterviewedRejections () {
        if (dates_changed) {
            axios.get('api/myapplications/?interviewed=true&feedback=Rejected'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setRejectedInterviews(res.data.length);
                    }
                    else {
                        setRejectedInterviews(0);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });;
        }

        else {
            axios.get('api/myapplications/?interviewed=true&feedback=Rejected').then(
                res => {
                    if (res.data.length) {
                        setRejectedInterviews(res.data.length);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });;
        }
    }
    
    function fetchOffers () {
        if (dates_changed) {
            axios.get('api/myapplications/?feedback=Offer'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    if (res.data.length) {
                        setOffers(res.data.length);
                    }
                    else {
                        setOffers(0);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }

        else {
            axios.get('api/myapplications/?feedback=Offer').then(
                res => {
                    if (res.data.length) {
                        setOffers(res.data.length);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }
    }
    
    function fetchInterviews () {
        if (dates_changed) {
            axios.get('api/myapplications/?interviewed=true'.concat('&date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {               
                    if (res.data.length) {
                        setInterviews(res.data.length);
                    }
                    else {
                        setInterviews(0);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });;
        }

        else {
            axios.get('api/myapplications/?interviewed=true').then(
                res => {               
                    if (res.data.length) {
                        setInterviews(res.data.length);
                    }
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }
    }
    
    function FetchAllApps() {
        if (dates_changed) {
            axios.get('/api/myapplications/?'.concat('date_from=',from.toISOString(),'&date_to=',to.toISOString())).then(
                res => {
                    setAllApps(res.data.length);          
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }

        else {
            axios.get('/api/myapplications/').then(
                res => {
                    setAllApps(res.data.length);          
                }
            ).catch(error => {console.log(error['message']);
                              if (error['message'] === 'Request failed with status code 401') {
                                  fetchError();
                              }
                             });
        }
    }

    function runFunctions () {
        FetchAllApps();
        fetchInterviews();
        RejectionsWithoutInterviews();
        fetchInterviewedRejections();
        fetchOffers();
        YetToInterview();
        fetchApplicationTypes();
        fetchApplicationTypeInterviews();
        Calculations();
        setLoading(false);
    }
    
    useEffect(() => {
        runFunctions();
    });                 
    
    return (
        <div>          
          { loading ?
            <div className='grid h-screen place-items-center'>
              <BeatLoader color="#36d7b7" size="50"/>
            </div>
            :
            allapps > 0 ?             
            
            <div>                                         
              {/* <p className='flex justify-center mt-6 text-bold text-xl'> Filter </p> */}
              <div className='flex flex-col items-center justify-center mt-6'>
                <div className='flex flex-col'>
                  <p className='mb-3 text-bold'> From </p>
                  <DateTimePicker onChange={setFrom} value={from} className="mr-6"  />
                </div>
                
                <div className='flex flex-col'>
                  <p className='mb-3'> To </p>
                  <DateTimePicker onChange={setTo} value={to} className="mr-6"  />
                </div>
                
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 rounded px-2 mt-5' onClick={SubmitDates}>
                  Filter
                </button>
                
              </div>
              
              <p className="flex justify-center mt-6 text-3xl text-bold"> My Statistics </p>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Applications </p>
                <p className='bg-blue-200 w-24 mt-5 h-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {allapps} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Company Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {interviews ? <Link to="/company-interviews"> {interviews} </Link> : interviews } </p>
                </p>
              </div>

              
              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Rejections after Interviews </p>
                <p className='bg-blue-200 w-24 mt-5 h-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {rejected_interviews} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Offers </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {offers ? <Link to="/offers"> {offers} </Link> : offers} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Companies we are yet to hear from </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
            <p className='text-yellow-600 text-2xl'> { yet_to_interview ?  <Link to="/yet-to-hear"> {yet_to_interview} </Link>  : yet_to_interview} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Offer rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {success_rate_interviews}% </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Rejection Rate Without Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {rejected_without_interviews_rate}% </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {interview_rate}% </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Companies yet to contact you </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {yet_to_hear_rate}% </p>
                </p>
              </div>
              

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Linkedin Applications </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {linkedinapps} </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Referrals </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {referrals} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Recruiters </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {recruiter} </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Jobsite Applications </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {jobsite} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Company Websites </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {comp_web} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Sent Emails </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {sent_emails} </p>
                </p>
              </div>
              

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Linkedin Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {linkedin_interviews} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Referral Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {referrals_interviews} </p>
                </p>
              </div>
              
              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Recruiter Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {recruiter_interviews} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Jobsite interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {jobsite_interviews} </p>
                </p>
              </div>
              

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Company Website Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {company_website_interviews} </p>
                </p>
              </div>


              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Sent Email Interviews </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {email_interviews} </p>
                </p>
              </div>
              

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Linkedin Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {linkedin_interview_rates}% </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Referral Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {referrals_interview_rates}% </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Recruiter Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {recruiter_interview_rates}% </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Job Site Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {jobsite_interview_rates}% </p>
                </p>
              </div>              
              

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Company Website Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {company_website_interview_rates}% </p>
                </p>
              </div>

              <div class="flex justify-center justify-around lg:mx-32">
                <p className='mt-5 flex flex-col items-center justify-center w-28 text-center'> Sent Email Callback Rate </p>
                <p className='bg-blue-200 mt-5 h-24 w-24 flex flex-col items-center justify-center'>
                  <p className='text-yellow-600 text-2xl'> {sent_email_interview_rates}% </p>
                </p>
              </div>
              
            </div>                     
            :
            <div>
              <p className='flex justify-center mt-6 mx-4 text-xl text-bold '>
                You have no job applications. Therefore, there are no statistics.
              </p>
                            
            </div>
          }          
        </div>
    );
}



// <div class="mt-8 flex flex-col justify-center items-center">
//   <p> {linkedinapps} applications were made using Linkedin. </p>
//   <p> {referrals} applications are referrals. </p> 
//   <p> {recruiter} applications are through recruiters. </p>
//   <p> {jobsite} applications are through job search sites. </p>
//   <p> {comp_web} applications were made through company websites. </p> 
// </div>

// <div class="flex flex-col items-center mt-8">
//   <p> Applications from linkedin have resulted in {linkedin_interviews} interviews. </p>
//   <p> Referrals have resulted in {referrals_interviews} interviews. </p>
//   <p> Recruiter calls have resulted in {recruiter_interviews} interviews. </p>
//   <p> {jobsite_interviews} interviews are from job site applications </p>
//   <p> {company_website_interviews} interviews are from applications you made from company websites. </p>
// </div>

// <div className='flex flex-col items-center mt-8'>
//   <p> Your callback rate from Linkedin applications is {linkedin_interview_rates}%  </p>
//   <p> Your callback rate from referrals is {referrals_interview_rates}% </p>
//   <p> Your callback rate from recruiters is {recruiter_interview_rates}% </p>
//   <p> Your callback rate from Job site applications is {jobsite_interview_rates}% </p>
//   <p> Your callback rate from company website applications is {company_website_interview_rates}% </p>
// </div>




// <p className='text-lg mx-12 mt-6'> You have made {allapps} {allapps > 1  ? <p className='inline text-lg'> applications </p> : <p className='inline text-lg'> application </p>} so far.

//   {
//   interviews ? <p className='inline'>
//                  You have interviewed with <Link to="/company-interviews">  {interviews} </Link> {interviews > 1 || interviews === 0 ? <p className='inline text-lg'> companies </p> : <p className='inline text-lg'> company </p>} so far. </p>
//       : <p>
//           <p>
//           You have interviewed with {interviews} {interviews > 1 || interviews === 0 ? <p className='inline text-lg'> companies </p> : <p className='inline text-lg'> company </p>} so far. </p>
//       </p>
//   }

//   { offers ?
//     <p className='inline'>
//       You have received <Link to="/offers"> {offers} </Link> {offers > 1 || offers === 0 ? <p className='inline text-lg'> offers </p> : <p className='inline text-lg'> offer </p>} so far.
//     </p>
//     :
//     <p className='inline'>
//       You have received {offers} {offers > 1 || offers === 0 ? <p className='inline text-lg'> offers </p> : <p className='inline text-lg'> offer </p>} so far.
//     </p>
//   }

//   { interviews ? <p className='inline'> Of all the interviews you have conducted, you have received {rejected_interviews ? <Link to="/interview-rejections">  {rejected_interviews}  </Link> : rejected_interviews}
//                    {rejected_interviews > 1  || rejected_interviews === 0 ? <p className='inline text-lg'> rejections</p> : <p className='inline text-lg'> rejection </p>}. </p> : <p> </p>
//   }

//   { interviews ? <p className='inline'>
//                    {rejected_without_interviews ? <Link to="/non-interview-rejections"> {rejected_without_interviews} </Link> : rejected_without_interviews} {rejected_without_interviews > 1 || rejected_without_interviews === 0 ? <p className='inline text-lg'> companies </p> : <p className='inline text-lg'> company </p>} rejected you without any interviews. </p>  : <p> </p>
//   }

//   Of all your applications, you are yet to hear from {yet_to_interview ? <Link to="/yet-to-hear"> {yet_to_interview} </Link> : yet_to_interview} {yet_to_interview > 1 || yet_to_interview === 0 ? <p className='inline text-lg'> companies</p> : <p className='inline text-lg'> company </p>}. </p>

// <div className='mt-8'>
//   <p className='flex justify-center'> Your success(offer) rate based on interviews is {success_rate_interviews}% </p>
//   <p className='flex justify-center'> Your rejection rate without getting interviews is {rejected_without_interviews_rate}%</p>
//   <p className='flex justify-center'> Your interview rate (callback rate) is {interview_rate}%  </p>
//   <p className='flex justify-center'> {yet_to_hear_rate}% of companies are yet to contact you.  </p>
// </div>
// <p> </p>
