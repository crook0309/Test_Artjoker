import React from 'react';
import logo from '../../logo.svg';
import s from './Header.module.css'


function Header() {
    return (
       <div className={s.headerWrap}>
            <div className={s.logoWrap}>
                <img src={logo} className={s.logo} alt="logo" />
            </div>
            <div className={s.titleApp}>
                <h1>Test Artjoker</h1>
            </div>
        </div>
    );
}

export default Header;
