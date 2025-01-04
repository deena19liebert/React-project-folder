import React from 'react';
import './App.css';
import img from './images/chef-logo.jpg';

export default function Header() {
    return (
        <header>
            <img src={img} alt="header logo"/>
            <h1>Chef Claud</h1>
        </header>
    )
}