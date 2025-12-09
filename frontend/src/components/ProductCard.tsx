'use client';

import { Product } from '@/types';
import { Card, Badge, Button } from 'react-bootstrap';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = Number(product.price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Card className="h-100 shadow-sm border-0 hover-shadow transition-all">
      <div style={{ height: '200px', overflow: 'hidden' }} className="bg-light position-relative">
        {product.imageUrl ? (
          <Card.Img 
            variant="top" 
            src={product.imageUrl} 
            className="h-100 w-100 object-fit-cover"
            alt={product.name}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 text-muted">
            <i className="bi bi-image fs-1"></i> Sem Imagem
          </div>
        )}
        <Badge bg="primary" className="position-absolute top-0 end-0 m-2 shadow-sm">
          {product.category}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-truncate" title={product.name}>
          {product.name}
        </Card.Title>
        <Card.Text className="text-muted small flex-grow-1" style={{ maxHeight: '3em', overflow: 'hidden' }}>
          {product.description}
        </Card.Text>
        
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-success fw-bold">{price}</h5>
          <small className="text-secondary">Estoque: {product.stock}</small>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0">
        <Button variant="outline-primary" size="sm" className="w-100">
          Ver Detalhes
        </Button>
      </Card.Footer>
    </Card>
  );
}