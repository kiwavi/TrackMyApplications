import './App.css'; import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from './IndexPage';
import Header from './Header';
import axios from "axios";
import Login from "./Login";
import Signup from "./Signup";
import Home from './Home';
import RequireAuth from './requireAuth';
import AddApplication from './Addapplication';
import MyApps from './MyApps';
import JobDetail from './JobDetail';
import MyStats from './MyStats';
import PageNotFound from './PageNotFound';
import Footer from './Footer';
import About from './About';
import TestDates from './TestDates';
import CompaniesInterviewed from './CompaniesInterviewed';
import Offers from './Offers';
import InterviewRejections from './InterviewRejections';
import RejectionsWithoutInterview from './RejectionsWithoutInterview';
import YetToHear from './YetToHear';
import SearchJob from './SearchResult';
import PasswordReset from './PasswordReset';
import PasswordResetLink from './PasswordResetLink';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import ContactMe from './ContactUs';

axios.defaults.baseURL = "http://127.0.0.1:8000";

export default function App() {
    return (
	<Router>
          <div class="min-h-screen flex flex-col">
            <div class="main flex-grow">
              <NotificationContainer/>
              <Header/>
	        <Routes>
	          <Route path="/" element={<IndexPage/>}> </Route>
                  <Route path="/login" element={<Login/>}> </Route>
                  <Route path="/signup" element={<Signup/>}> </Route>
                  <Route path="/about" element={<About/>}> </Route>
                  <Route path="/home" element={<RequireAuth> <Home/> </RequireAuth> }> </Route>
                  <Route path="/addapplication" element={<RequireAuth> <AddApplication/> </RequireAuth> }> </Route>
                  <Route path="/myapplications" element={<RequireAuth> <MyApps/> </RequireAuth> }> </Route>
                  <Route path="/jobdetail/:id" element={<RequireAuth> <JobDetail/> </RequireAuth> }> </Route>
                  <Route path="/mystats" element={<RequireAuth> <MyStats/> </RequireAuth> }> </Route>
                  <Route path="*" element={<PageNotFound/>}> </Route>
                  <Route path="/dates" element={<TestDates/>}> </Route>
                  <Route path="/company-interviews" element={<RequireAuth> <CompaniesInterviewed/> </RequireAuth> }> </Route>
                  <Route path="/offers" element={<RequireAuth> <Offers/> </RequireAuth> }> </Route>
                  <Route path="/interview-rejections" element={<RequireAuth> <InterviewRejections/> </RequireAuth> }> </Route>
                  <Route path="/non-interview-rejections" element={<RequireAuth> <RejectionsWithoutInterview/> </RequireAuth> }> </Route>
                  <Route path="/yet-to-hear" element={<RequireAuth> <YetToHear/> </RequireAuth> }> </Route>
                  <Route path="/applications/:term" element={<RequireAuth> <SearchJob/> </RequireAuth> }> </Route>
                  <Route path="/password/reset/:code" element={<PasswordReset/>}> </Route>
                  <Route path="/password/link" element={<PasswordResetLink/>}> </Route>
                  <Route path="/contact-us" element={<ContactMe/>}> </Route>
	        </Routes>
            </div>
            {/* place footer here */}
            <Footer/>
          </div>
	</Router>        
    );
}
