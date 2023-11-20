import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { PartnerEntity } from "../partner/partner.entity";

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  foundationDate: Date;

  @Column()
  image: string;

  @Column({ length: 100 })
  description: string;


  @ManyToMany(() => PartnerEntity, partner => partner.clubs)
  @JoinTable()
  partners: PartnerEntity[];
}
