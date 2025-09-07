import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string; // nombre del evento

  @IsString()
  @IsOptional()
  description?: string; // descripcion del evento

  @IsDate()
  @Type(() => Date)
  startDate: Date; // fecha de inicio

  @IsDate()
  @Type(() => Date)
  endDate: Date; // fecha final
}
