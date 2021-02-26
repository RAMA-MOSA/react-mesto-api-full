import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hook/useFormWithValidation';

function Register({ onRegistration }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values);
    resetForm();
  }

  return ( 
    <div className="login page__login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
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
        disabled={!isValid}>
          Зарегистрироваться
        </button>
        <p className="login__text" >
          Уже зарегистрированы?
          <Link className="login__link" to='/sign-in'>
            {' '}
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
