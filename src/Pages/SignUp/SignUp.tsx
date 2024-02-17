import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { useForm, Controller } from 'react-hook-form';
import Input from '../../Components/Input';
import { EyeOff } from '../../Assets/EyeOff/EyeOff';
import { EyeOn } from '../../Assets/EyeOn/EyeOn';
import { string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/Reducers/dataReducer';
import { useNavigate } from 'react-router';
import { PathNames } from '../Router/Router';

export enum PasswordTypes {
  Password = 'password',
  Text = 'text'
}
const schema = yup
  .object()
  .shape({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
    passwordConfirmation: string().required()
  })
  .required();

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState(PasswordTypes.Password);
  const [typeConfirm, setTypeConfirm] = useState(PasswordTypes.Password);

  const onEyeClick = () => {
    type === PasswordTypes.Password ? setType(PasswordTypes.Text) : setType(PasswordTypes.Password);
  };
  const onEyeClickConfirm = () => {
    typeConfirm === PasswordTypes.Password
      ? setTypeConfirm(PasswordTypes.Text)
      : setTypeConfirm(PasswordTypes.Password);
  };

  const {
    control,
    clearErrors,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = handleSubmit((data) => {
    dispatch(
      registerUser({ data: { email: data.email, password: data.password }, callback: () => navigate(PathNames.Home) })
    );
  });

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.title}>{'Регистрация'}</div>
        <Controller
          control={control}
          name={'name'}
          render={({ field: { onChange, value } }) => (
            <Input
              title={'Имя'}
              type={'text'}
              placeholder={'Enter your name...'}
              onChange={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={'email'}
          render={({ field: { onChange, value } }) => (
            <Input
              title={'Электронная почта'}
              type={'text'}
              placeholder={'example@mail.ru'}
              onChange={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />
        <div className={styles.passwordContainer}>
          <Controller
            control={control}
            name={'password'}
            render={({ field: { onChange, value } }) => (
              <Input
                title={'Пароль'}
                type={type}
                placeholder={'Enter password'}
                onChange={onChange}
                value={value}
                error={errors.password?.message}
                onFocus={() => {
                  clearErrors('password');
                }}
              />
            )}
          />
          <div className={styles.eyeIcon} onClick={onEyeClick}>
            {type !== 'password' ? <EyeOn /> : <EyeOff />}
          </div>
        </div>
        <div className={styles.passwordContainer}>
          <Controller
            control={control}
            name={'passwordConfirmation'}
            render={({ field: { onChange, value } }) => (
              <Input
                title={'Подтвердите пароль'}
                type={typeConfirm}
                placeholder={'Confirm password'}
                onChange={onChange}
                value={value}
                error={errors.passwordConfirmation?.message}
                onFocus={() => {
                  clearErrors('passwordConfirmation');
                }}
              />
            )}
          />
          <div className={styles.eyeIcon} onClick={onEyeClickConfirm}>
            {typeConfirm !== 'password' ? <EyeOn /> : <EyeOff />}
          </div>
        </div>
      </div>
      <button className={styles.btn} type="button" onClick={onSubmit}>
        {'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default SignUp;
