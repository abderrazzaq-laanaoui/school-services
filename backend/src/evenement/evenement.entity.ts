import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity()
export class Evenement  extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Subject: string;

  @Column()
  StartTime: Date;

  @Column()
  EndTime: Date;

  @Column()
  IsAllDay: boolean 

  @Column()
  RecurrenceRule: string;

  @Column()
  StartTimezone: string;

  @Column()
  EndTimezone: string;

}
