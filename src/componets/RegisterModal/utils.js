import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });
