import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    // Transação para garantir integridade do estoque e criação do pedido
    return this.prisma.$transaction(async (tx) => {
      let total = 0;
      const orderItemsData: { productId: string; quantity: number; price: any }[] = [];

      for (const item of data.products) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        
        if (!product) {
          throw new BadRequestException(`Produto ${item.productId} não encontrado.`);
        }
        
        if (product.stock < item.quantity) {
          throw new BadRequestException(`Estoque insuficiente para o produto ${product.name}.`);
        }

        // Atualizar estoque
        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });

        total += Number(product.price) * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price, // Salvar preço histórico
        });
      }

      // Criar o pedido
      const order = await tx.order.create({
        data: {
          total,
          status: 'Concluído', // Conforme regra de negócio, se atualizou estoque, conclui (ou cria pendente e processa depois)
          orderItems: {
            create: orderItemsData,
          },
        },
        include: { orderItems: true },
      });

      return order;
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { orderItems: { include: { product: true } } },
    });
  }
}