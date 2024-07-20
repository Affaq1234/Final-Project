import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Username must be at least 2 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    phone: Yup.string()
      .matches(/^\d{11}$/, 'Phone number must be 11 digits')
      .required('Phone number is required'),
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Form data', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
