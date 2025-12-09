import { IsString, IsNumber, IsUrl, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Notebook Dell' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Eletrônicos' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Notebook i7 16GB' })
  @IsString()
  description: string;

  @ApiProperty({ example: 4500.00 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'https://img.com/foto.jpg', required: false })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}