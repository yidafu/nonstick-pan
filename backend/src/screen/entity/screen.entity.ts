import { EFillType } from 'common';
import dayjs from 'dayjs';
import {
  Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'vs_screen' })
export class ScreenEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

  @Column()
    name: string;

  @Column()
    width: number;

  @Column()
    height: number;

  @Column({ name: 'backgroup_color' })
    backgroupColor: string;

  @Column({ name: 'backgroup_image' })
    backgroupImage: string;

  @Column({ name: 'snapshot_url' })
    snapshotUrl: string;

  @Column({
    name: 'fill_type', type: 'enum', enum: EFillType, default: EFillType.Contain,
  })
    fillType: number;

  @Column({ name: 'is_published', default: false })
    isPublished: boolean;

  @Column({ name: 'is_template', default: false })
    isTemplate: boolean;

  @CreateDateColumn({
    name: 'created_at',
    transformer: {
      to(value: string): Date {
        return dayjs(value).toDate();
      },
      from(value: Date): string {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  })
    createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    transformer: {
      to(value: string): Date {
        return dayjs(value).toDate();
      },
      from(value: Date): string {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  })
    updatedAt: string;
}
