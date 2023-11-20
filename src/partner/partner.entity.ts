import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ClubEntity } from "../club/club.entity";

@Entity()
export class PartnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @ManyToMany(() => ClubEntity)
  clubs: ClubEntity[];
}
