import React from 'react';
import { useFormWithValidation } from '../../hook/useFormWithValidation';

function Login({ onAuthorization, onCheckToken }) {
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
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" noValidate
      onSubmit={handleSubmit}>
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
        <button className={!isValid ?
          "login__button login__button_inactive"
        :
          "login__button"
        }
        type="submit"
        disabled={!isValid}
      >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
