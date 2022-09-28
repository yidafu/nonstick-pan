export interface IComponent {
  /**
   * 数据表定义的是 bigint，typeorm 转成了 string
   *
   * @type {string}
   * @memberof IComponent
   */
  id: string;

  name: string;

  screenId: number;

  groupId: number;

  layerName: string;

  isGroup: boolean;

  isLock: boolean;

  isLockAspectRatio: boolean;

  width: number;

  height: number;

  offsetX: number;

  offsetY: number;

  zIndex: number;

  category: string;

  subCategory: string;

  styleConfig: IComponentStyleConfig;

  requestConfig: IComponentRequestConfig;

  interactConfig: IComponentIneractConfig;

  createdAt: string;
  updatedAt: string;
}

export interface IComponentStyleConfig {

}

export interface IComponentRequestConfig {

}

export interface IComponentIneractConfig {

}