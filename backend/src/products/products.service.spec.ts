import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  product: {
    findMany: jest.fn().mockResolvedValue([{ id: '1', name: 'Test' }]),
    create: jest.fn().mockResolvedValue({ id: '1', name: 'New' }),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of products', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(mockPrisma.product.findMany).toHaveBeenCalled();
  });
});