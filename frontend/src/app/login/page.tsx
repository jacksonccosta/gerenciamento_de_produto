'use client';

import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      setLoginError('');
      const response = await api.post('/auth/login', data);
      
      // Salva o token no LocalStorage
      localStorage.setItem('token', response.data.access_token);
      
      // Redireciona para a Home
      router.push('/');
    } catch (error: any) {
      console.error(error);
      setLoginError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <Container style={{ maxWidth: '400px' }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>
            
            {loginError && <Alert variant="danger">{loginError}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email', { required: 'Email é obrigatório' })}
                  isInvalid={!!errors.email}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  {...register('password', { required: 'Senha é obrigatória' })}
                  isInvalid={!!errors.password}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>

              <div className="text-center">
                <small className="text-muted">Não tem conta? </small>
                <Link href="/register" className="text-decoration-none fw-bold">
                  Cadastre-se
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}