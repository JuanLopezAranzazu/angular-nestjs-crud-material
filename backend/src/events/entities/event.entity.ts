import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number; // identificador

  @Column({ type: 'varchar', length: 150 })
  name: string; // nombre del evento

  @Column({ type: 'text', nullable: true })
  description?: string; // descripcion del evento

  @Column({ type: 'datetime' })
  startDate: Date; // fecha de inicio

  @Column({ type: 'datetime' })
  endDate: Date; // fecha final

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // fecha de creacion

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // fecha de actualizacion
}
