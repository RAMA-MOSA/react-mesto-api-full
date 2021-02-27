import React from 'react';

const Structure = ({ title, buttonText, isValid, onSubmit, linkForm, children }) => {
  return (
    <div className="login page__login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" noValidate onSubmit={onSubmit}>
        {children}
        <button className={!isValid ? "login__button login__button_inactive" : "login__button"}
        type="submit"
        disabled={!isValid}>
          {buttonText}
        </button>
        {linkForm && linkForm}
      </form>
    </div>
  )
}

export default Structure;
