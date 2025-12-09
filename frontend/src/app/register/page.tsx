'use client';

import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Card, Form, Button } from 'react-bootstrap';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await api.post('/auth/register', data);
      alert('Cadastro realizado! Faça login.');
      router.push('/login');
    } catch (error) {
      alert('Erro ao cadastrar. O email pode já estar em uso.');
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <Container style={{ maxWidth: '400px' }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h3 className="text-center mb-4 fw-bold text-success">Criar Conta</h3>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Seu Nome"
                  {...register('name', { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email', { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  {...register('password', { required: true, minLength: 6 })}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mb-3" disabled={isSubmitting}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </Button>

              <div className="text-center">
                <small className="text-muted">Já tem conta? </small>
                <Link href="/login" className="text-decoration-none fw-bold">
                  Faça Login
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}