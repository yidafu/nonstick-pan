export interface IBaseComponent {
  name: string;

  layerName: string;

  isLock: boolean;

  isLockAspectRatio: boolean;

  width: number;

  height: number;


  category: string;

  subCategory: string;

  styleConfig: IComponentStyleConfig;

  styleLabelConfig: IComponentStyleLabelGroup[],

  requestConfig: IComponentRequestConfig;

  interactConfig: IComponentIneractConfig;  
}

export interface IComponent extends IBaseComponent {
  id: string;

  screenId: number;

  groupId: string;

  isGroup: boolean;

  offsetX: number;

  offsetY: number;

  zIndex: number;

  createdAt: string;
  updatedAt: string;
}

export interface IComponentNode extends IComponent {
  children: IComponentNode[];
}

export interface IComponentStyleConfig {
  [group: string]: {
    [value: string]: boolean | string | number;
  }
}

export interface IComponentStyleLabelGroup {
  label: string;
  children: TComponentStyleLabelItem[];
}
export type TComponentStyleLabelItem = IComponentStyleLabelNumberItem
  | IComponentStyleLabelStringItem
  | IComponentStyleLabelBooleanItem
  | IIComponentStyleLabelSelectionItem;

export interface IComponentStyleLabelItem {
  type: string;
  mapTo: string;
  label: string;
}

export enum EStyleConfigLabelType {
  Num = 'Number',
  Str = 'String',
  Bool = 'Boolean',
  Selection = 'Selection',
  Color = 'Color',
  Image = 'Image',
  Video = 'Video',
}

export interface IComponentStyleLabelNumberItem extends IComponentStyleLabelItem {
  type: EStyleConfigLabelType.Num,
  // 针对 Number 类型
  min: number;
  max: number;
  step: number;
}

export interface IComponentStyleLabelStringItem extends IComponentStyleLabelItem {
  type: EStyleConfigLabelType.Str,
}

export interface IComponentStyleLabelBooleanItem extends IComponentStyleLabelItem {
  type: EStyleConfigLabelType.Bool,
}

export interface IStyleConfigLableOption {
  value: string,
  label: string;
}

export interface IIComponentStyleLabelSelectionItem  extends IComponentStyleLabelItem {
  type: EStyleConfigLabelType.Selection,

  options: IStyleConfigLableOption[],
}

export interface IComponentStyleLabelNumberItem extends IComponentStyleLabelItem {
  type: EStyleConfigLabelType.Num,
  // 针对 Number 类型
  min: number;
  max: number;
  step: number;
}

export interface IComponentRequestConfig {

}

export interface IComponentIneractConfig {

}