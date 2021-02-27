import React from 'react';
import Structure from '../Structure/Structure';
import { useFormWithValidation } from '../../hook/useFormWithValidation';

const Login = ({ onAuthorization, onCheckToken }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values);
    resetForm();
  }

  return (
    <Structure
      title="Вход"
      buttonText="Войти"
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className="login__input login__email"
        placeholder="Email"
        id="login-email"
        aria-label="электронная почта"
        required
        type="email"
        name="email"
        maxLength="30"
        value={values.email || ''}
        onChange={handleChange}
      />
      <span
        className={errors.email ? 'login__input-error login__input-error_active' : 'login__input-error'}
        id="login-email-error"
      >
        {errors.email}
      </span>
      <input
        className="login__input login__password"
        placeholder="Пароль"
        id="login-password"
        aria-label="пароль"
        required
        type="password"
        name="password"
        value={values.password || ''}
        onChange={handleChange}
      />
      <span
        className={errors.password ? 'login__input-error login__input-error_active' : 'login__input-error'}
        id="login-password-error"
      >
        {errors.password}
      </span>
    </Structure>
  );
}

export default Login;
