'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Container, Row, Col, Navbar, Form, InputGroup, Button, Spinner, Alert } from 'react-bootstrap';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Barra de Navegação Superior */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
            🛒 Sistema de Produtos
          </Navbar.Brand>
          <div className="d-flex">
             <Link href="/products/new" className="btn btn-success text-white text-decoration-none">
                + Novo Produto
              </Link>
          </div>
        </Container>
      </Navbar>

      <Container>
        {/* Cabeçalho e Filtros */}
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <Row className="align-items-center g-3">
            <Col md={6}>
              <h2 className="mb-0 text-secondary">Catálogo</h2>
              <p className="text-muted mb-0">Gerencie seu estoque de forma eficiente</p>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text id="search-icon">🔍</InputGroup.Text>
                <Form.Control
                  placeholder="Buscar produto por nome..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Buscar"
                />
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Lista de Produtos */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Carregando catálogo...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <Alert variant="info" className="text-center">
            Nenhum produto encontrado. Que tal cadastrar um novo?
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4 pb-5">
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}