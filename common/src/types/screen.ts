export interface IScreen {
  /**
   * 数据表定义的是 bigint，typeorm 转成了 string
   *
   * @type {string}
   * @memberof IComponent
   */
  id: string;

  name: string;

  width: number;

  height: number;

  backgroupColor: string;

  backgroupImage: string;

  snaphotUrl: string;

  fillType: EFillType;

  isTemplate: boolean;

  isPublished: boolean;

  createdAt: string;

  updatedAt: string;
}

export enum EFillType {
  Contain,
  Caver,
  Overflow,
}
