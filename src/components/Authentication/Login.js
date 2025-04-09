import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [misMatch, setMisMatch] = useState(false);
    const [error, setError] = useState('');

    const Sign_Up = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
    const Api_Key = `AIzaSyCZqRRu8zlgRgO9CWYhhCVTfyBiGE1VY4o`;

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setIsLoading(true);
            setError('');  

            try {
                const response = await fetch(`${Sign_Up}${Api_Key}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log(`User has successfully signed up.`)
                    // Handle successful signup/login
                } else {
                    const data = await response.json();
                    let errorMessage = 'Authentication failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    setError(errorMessage); 
                }
            } catch (error) {
                setError('An error occurred, please try again!');
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            setMisMatch(true);
            setTimeout(() => setMisMatch(false), 3000);
        }

        setPassword('');
        setConfirmPassword('');
    };

    const onLoginHandler = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    return (
        <Container className="auth" style={{ maxWidth: '500px' }}>
            <Row className="text-center mt-2">
                <Col>
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    {!isLogin && misMatch && (
                        <Alert variant="danger">Password Mismatch!</Alert>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>

            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Your Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {!isLogin && (
                    <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                )}

                {isLogin && (
                    <div className="form-text mt-2" style={{ fontWeight: 'bold' }}>
                        <a href="#forgot-password">Forgot password?</a>
                    </div>
                )}

                <div className="actions">
                    <Button
                        variant={isLogin ? 'primary' : 'success'}
                        type="submit"
                        className="w-100"
                        disabled={isLoading}
                    >
                        {isLogin ? 'Login' : 'Create Account'}
                    </Button>

                    {isLoading && <p>Sending request...</p>}

                    <Button
                        variant="link"
                        onClick={onLoginHandler}
                        className="w-100 mt-3"
                    >
                        {isLogin ? 'Create a new account' : 'Login with existing account'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;
