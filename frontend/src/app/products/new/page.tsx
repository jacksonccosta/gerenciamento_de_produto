'use client';

import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { CreateProductInput } from '@/types';
import { Container, Card, Form, Button, Row, Col, FloatingLabel, InputGroup } from 'react-bootstrap';

export default function NewProductPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateProductInput>();

  const onSubmit = async (data: CreateProductInput) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      };
      
      await api.post('/products', payload);
      alert('Produto criado com sucesso!');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar produto.');
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <Container style={{ maxWidth: '700px' }}>
        <Card className="shadow border-0">
          <Card.Header className="bg-white border-bottom-0 pt-4 px-4">
            <h2 className="text-primary fw-bold mb-0">Novo Produto</h2>
            <p className="text-muted">Preencha os dados abaixo para cadastrar</p>
          </Card.Header>
          
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ex: Notebook Gamer"
                      isInvalid={!!errors.name}
                      {...register('name', { required: 'Nome é obrigatório' })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select 
                      {...register('category', { required: 'Selecione uma categoria' })}
                      isInvalid={!!errors.category}
                    >
                      <option value="">Selecione...</option>
                      <option value="Eletrônicos">Eletrônicos</option>
                      <option value="Móveis">Móveis</option>
                      <option value="Roupas">Roupas</option>
                      <option value="Livros">Livros</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Preço (R$)</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>R$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        {...register('price', { required: true, min: 0 })}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Estoque Inicial</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      {...register('stock', { required: true, min: 0 })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>URL da Imagem</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg"
                  {...register('imageUrl')}
                />
                <Form.Text className="text-muted">
                  Cole o link direto de uma imagem hospedada na web.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Descrição Detalhada</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" label="Detalhes do produto">
                  <Form.Control
                    as="textarea"
                    placeholder="Descrição"
                    style={{ height: '100px' }}
                    {...register('description', { required: true })}
                  />
                </FloatingLabel>
              </Form.Group>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="outline-secondary" onClick={() => router.back()} className="me-md-2">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting} size="lg">
                  {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}