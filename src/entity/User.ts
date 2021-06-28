import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  rut: string;

  @Column()
  password: string;

  @Column({ name: 'last_connection' })
  lastConnection: Date;
}
