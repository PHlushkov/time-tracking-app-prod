import { Box, Button, Modal, TextField, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../redux/slice/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './utils';

const RegisterModal = ({ openRefisterModal, handleCloseRegisterModal }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [isRegister, setIsRegister] = useState(true);

  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    if (isRegister) {
      dispatch(registerUser(data)).then((user) => {
        if (user.uid) {
          reset();
          handleCloseRegisterModal();
        }
      });
    } else {
      dispatch(loginUser(data))
        .unwrap()
        .then((user) => {
          if (user.uid) {
            reset();
            handleCloseRegisterModal();
          }
        });
    }
  };

  return (
    <Modal
      open={openRefisterModal}
      onClose={handleCloseRegisterModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <BoxWrapper>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            {...register('email', { required: 'Email is required' })}
            error={errors && Object.keys(errors).includes('email')}
            fullWidth
          />
          <MessageWrapper>
            {errors?.email && (
              <ErrorMessageMain color="red">{errors?.email.message}</ErrorMessageMain>
            )}
          </MessageWrapper>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors && Object.keys(errors).includes('password')}
            fullWidth
          />
          <MessageWrapper>
            {errors?.password && (
              //TODO использовать везде компонент для отрисовки ошибок, его можно export отсюда или создать реюзабельную/ компоненту
              <ErrorMessageMain color="red">{errors?.password.message}</ErrorMessageMain>
            )}
          </MessageWrapper>
          <Button type="submit" variant="contained" color="primary">
            {isRegister ? 'Register' : 'Login'}
          </Button>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </Button>
          {authStatus === 'loading' && <Typography>Loading...</Typography>}
          {authError && <Typography color="error">{authError}</Typography>}
        </form>
      </BoxWrapper>
    </Modal>
  );
};
const BoxWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #000;
  background-color: white;
  box-shadow: 24px;
  padding: 40px;
`;

const MessageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorMessageMain = styled(Typography)`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
`;

export default RegisterModal;
