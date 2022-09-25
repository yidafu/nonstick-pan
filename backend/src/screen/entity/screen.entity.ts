import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vs_screen' })
export class Screen {
  @PrimaryGeneratedColumn()
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

  @Column({ name: 'fill_type' })
    fillType: number;

  @Column({ name: 'is_published', default: false })
    isPublished: boolean;

  @Column({ name: 'is_template', default: false })
    isTemplate: boolean;

  @Column({ name: 'created_at' })
    createdAt: Date;

  @Column({ name: 'updated_at' })
    updatedAt: Date;
}
