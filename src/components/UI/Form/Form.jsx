import React from 'react';
import styles from './Form.module.css';

const Form = ({ children, onSubmit }) => {
    return <form onSubmit={onSubmit} className={styles.form}>{children}</form>;
};

export default Form;
