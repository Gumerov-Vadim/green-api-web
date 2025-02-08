import React, { useState, useContext } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Form from '../../components/UI/Form/Form';
import styles from './Login.module.css';
import AuthContext from '../../context/AuthContext';

function Login() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      login(idInstance, apiTokenInstance);
    } catch (error) {
      console.log("Ошибка при авторизации", error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход</h2>
        <h3 className={styles.subtitle}>Введите Instance ID и API Token</h3>

        <Input
          type="text"
          id="Instance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="Instance ID"
          required
        />

        <Input
          type="text"
          id="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          placeholder="API Token Instance"
          required
        />
        {error && <p className={styles.error}>Ошибка: {error}</p>}

        <Button className={styles.submitButton} type="submit">Далее</Button>
      </Form>
    </div>
  );
}

export default Login;
