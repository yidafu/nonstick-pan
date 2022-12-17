import {
  IComponentIneractConfig,
  IComponentRequestConfig,
  IComponentStyleConfig,
  IComponentStyleLabelGroup,
} from '@pan/common';
import dayjs from 'dayjs';
import {
  Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'vs_components' })
export class ComponentEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

  @Column({ type: 'bigint', name: 'screen_id' }) screenId: number;

  @Column({ type: 'bigint', name: 'group_id' }) groupId: number;

  @Column() name: string;

  @Column({ name: 'layer_name' }) layerName: string;

  @Column({ name: 'is_group', default: false }) isGroup: boolean;

  @Column({ name: 'is_lock', default: false }) isLock: boolean;

  @Column({ name: 'is_lock_aspect_ratio', default: false }) isLockAspectRatio: boolean;

  @Column() width: number;

  @Column() height: number;

  @Column({ name: 'offset_x' }) offsetX: number;

  @Column({ name: 'offset_y' }) offsetY: number;

  @Column({ name: 'z_index' }) zIndex: number;

  @Column() category: string;

  @Column({ name: 'sub_category' }) subCategory: string;

  @Column({
    name: 'style_config', type: 'json',
  }) styleConfig: IComponentStyleConfig;

  @Column({
    name: 'style_label_config', type: 'json',
  }) styleLabelConfig: IComponentStyleLabelGroup;

  @Column({
    name: 'request_config', type: 'json',
  }) requestConfig: IComponentRequestConfig;

  @Column({
    name: 'interact_config', type: 'json',
  }) interactConfig: IComponentIneractConfig;

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
  }) createdAt: string;

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
  }) updatedAt: string;
}
