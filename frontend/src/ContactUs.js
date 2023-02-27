import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import ReCAPTCHA from "react-google-recaptcha";

class ContactMe extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    error: false,
	    isLoading: false,
	    submitted: false,
	    value: null,
	    email: null,
	    isVerified: false,
	};
	this.captchaRef = React.createRef();
    }

    
    handleChange(event) {
	const val = event.target.value;
	this.setState({email: val});
    }


    handleChange2(event) {
	const val = event.target.value;
	this.setState({message: val});
    }

    sendEmail(e) {
	e.preventDefault();
	this.setState({isLoading: true});
	axios.post(
	    '/api/emails/', {
		email: this.state.email,
		message: this.state.message,
                // csrfmiddlewaretoken: this.state.csrftoken,
	    }
	).then(res => {
	    const result = res.data;
	    this.setState({ isLoading: false, submitted: true});
	}).catch(error => {
	    this.setState({ isLoading: false, error: true });
	});
	this.captchaRef.current.reset();
    }

    
    handleOnChange (value) {
	this.setState({isVerified: true});
    }
    
    render () {
	return (
	    <div>
	    {
		this.state.isLoading ?
                <div className='grid h-screen place-items-center'>
                  <BeatLoader color="#36d7b7" size="50"/>
                </div>
                    :
                    this.state.submitted ? <p class="flex justify-center mt-8"> Your message has been sent successfully! </p>
                    : this.state.error ? <p> Something went wrong </p>
                    :
		    <div>
		      <p class="flex justify-center mt-6 text-bold text-2xl mx-8 lg:mx-0"> Contact Us </p>
		      <p class="flex justify-center text-sm mx-6 mt-4"> Enter your message in the form below and include your contact details </p>                     
		      <form class="flex flex-col items-center justify-center mt-6 mb-12" onSubmit={this.sendEmail.bind(this)}>                        
		        <div class="mb-6">
		          <label for="name" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300"> Email  </label>
		          <input type="email" onChange={this.handleChange.bind(this)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-64 lg:w-80" placeholder="" required="required" />
		        </div>
		        
		        <div class="mb-6">
		          <label for="description" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300"> Message  </label>
		          <textarea type="text" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-64 lg:w-80" onChange={this.handleChange2.bind(this)} rows="4" cols="50" required="required">  </textarea>
		        </div>
                        
		        <ReCAPTCHA ref={this.captchaRef} onChange={this.handleOnChange.bind(this)} sitekey="6LflOboiAAAAAPKDlXRw2_PCVj7lYhFeDGdHmASK"/>
		        
		        <input disabled={!this.state.isVerified} type="submit" value="Send" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 w-28 lg:w-36" />
		      </form>
		      
		    </div>
	    }
	    </div>
	);
    }    
}

export default ContactMe;
