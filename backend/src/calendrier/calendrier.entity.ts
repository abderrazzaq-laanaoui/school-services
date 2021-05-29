import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Calendrier  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

}