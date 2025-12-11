import React, { useState } from 'react'

function RegistrationFrom() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const username = formData.username;
  const email = formData.email;
  const password = formData.password

  const [formErrors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Function to handle Change in state of specific input field
  const handleChange = (event) => {
    const {username, value} = event.target;

    setFormData(prevState => ({...prevState, [username]: value}));
  };

  //Clear the error for the current field as the user types
  if(formErrors[name]) {
    setErrors((prevErrors) => ({
      ...prevErrors, [name]: '',
    }))
  };

  //Validations
  const validateForm = () => {
    const errors = {};
    if(!username.trim()) {
      errors.name = 'Name is required!';
    }
    if(!email.trim()) {
      errors.email = 'Email is required!';
    }
    if(!password.trim()) {
      errors.password = 'Password is required!';
    }

    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    //Check if there are any errors
    if(Object.keys(validationErrors).length == 0) {
      //Validation Passed
      console.log('Registration successfully Submitted:', formData);
      setIsSubmitted(true);

      setFormData({username:'', email: '', password: ''}); 
    } else {
      console.log('Form submission failed due to validation errors!');
      setIsSubmitted(false);
      setFormData({username:'', email: '', password: ''}); 
    }

  };

  return (
    <div>
      <h1>User Registration</h1>
      {isSubmitted && Object.keys(formErrors).length === 0 && (
        <h1 style={{color: 'green'}}>Registration Successfull!</h1>
      )}
       <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' name='name' value={username} onChange={handleChange}/>
        {formErrors.name && (
          <p style={{color: 'red'}}>{formErrors.name}</p>
        )}

        <label htmlFor="email">Email:</label>
        <input type="email" value={email} id='email' name='email'  onChange={handleChange}/>
        {formErrors.email && (
          <p style={{ color: 'red' }}>{formErrors.email}</p>
        )}

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} id='password' name='password' onChange={handleChange}/>
        {formErrors.password && (
          <p style={{color:'red'}}>{formErrors.password}</p>
        )}

        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
   
  )
}

export default RegistrationFrom
