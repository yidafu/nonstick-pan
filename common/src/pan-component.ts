import React, { ReactNode } from 'react';
import merge from 'lodash.merge';
import { EStyleConfigLabelType, IBaseComponent } from "./types";

export interface IPanComponentConfig extends IBaseComponent {
  Component?: React.Component;

  esmUrl?: string;

  render?: (props: any) => ReactNode;
}

export function definePanComponent(config: Partial<IPanComponentConfig>): IPanComponentConfig {
  return merge(config, GLOBAL_COMPONENT_CONFIG) as IPanComponentConfig;
};

export const GLOBAL_COMPONENT_CONFIG: Partial<IPanComponentConfig> = {
  styleConfig: {
    globalStyle: {
      opacity: 1,
      prespective: '',
      transform: '',
      isIntervalRerender: false,
      rerenderInterval: 1000,
      cursor: 'default',
    },
    globalAnimation: {
      isAimation: false,
      animationName: '',
      animationDelay: 0,
      animationDuration: 0,
      hasInfiniteAnimation: false,
      infiniteAnimationName: '',
      infiniteAnimationDuration: 0,
      infiniteAnimationDirection: 'normal',
      infiniteAnimationTimingFunction: 'linear',
    },
  },
  styleLabelConfig: [
    {
      label: '全局样式',
      children: [
        {
          type: EStyleConfigLabelType.Num,
          mapTo: 'globalStyle.opacity',
          label: '透明度',
          min: 0,
          max: 1,
          step: 0.1,
        },
        {
          type: EStyleConfigLabelType.Str,
          mapTo: 'globalStyle.prespective',
          label: '透视距离',
        },
        {
          type: EStyleConfigLabelType.Str,
          mapTo: 'globalStyle.transform',
          label: '变形参数',
        },
        {
          type: EStyleConfigLabelType.Bool,
          mapTo: 'globalStyle.isIntervalRerender',
          label: '是否定时重绘',
        },
        {
          type: EStyleConfigLabelType.Num,
          mapTo: 'globalStyle.rerenderInterval',
          label: '定时重绘间隔',
          min: 16,
          max: 3000,
          step: 1,
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalStyle.cursor',
          label: '鼠标样式',
          options: [
            { label: '默认', value: 'default' },
            { label: '手型', value: 'pointer' },
          ]
        }
      ]
    },
    {
      label: '入场动画',
      children: [
        {
          type: EStyleConfigLabelType.Bool,
          mapTo: 'globalAnimation.isAimation',
          label: '是否启用动画',
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalAnimation.animationName',
          label: '入场动画效果',
          options: [
            { label: '顶部进入', value: 'backInDown' },
            { label: '左侧进入', value: 'backInLeft' },
            { label: '右侧进入', value: 'backInRight' },
            { label: '底部进入', value: 'backInUp' },
            // TODO: 更多进入动画支持
          ],
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalAnimation.animationDelay',
          label: '延迟时间',
          options: [
            { label: '0.1秒', value: 'animate_delay-100ms' },
            { label: '0.3秒', value: 'animate_delay-300ms' },
            { label: '1秒', value: 'animate_delay-1000ms' },
          ]
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalAnimation.animationDuration',
          label: '持续时间',
          options: [
            { label: '0.1秒', value: 'animate_duration-100ms' },
            { label: '0.3秒', value: 'animate_duration-300ms' },
            { label: '1秒', value: 'animate_duration-1000ms' },
          ]
        },

      ]
    },
    {
      label: '组件动画',
      children: [
        {
          type: EStyleConfigLabelType.Bool,
          mapTo: 'globalAnimation.hasInfiniteAnimation',
          label: '是否启用组件动画',
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalAnimation.infiniteAnimationName',
          label: '动画效果',
          options: [
            { label: '上下浮动', value: 'floatUpAndDown' },
            { label: '左右浮动', value: 'floatLeftAndRight' },
            { label: '呼吸效果', value: 'breath' },
          ]
        },
        {
          type: EStyleConfigLabelType.Num,
          mapTo: 'globalAnimation.infiniteAnimationDuration',
          label: '动画周期(ms)',
          min: 500,
          max: 30_0000,
          step: 100,
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalAnimation.infiniteAnimationDirection',
          label: '动画方向',
          options: [
            { label: '交替', value: 'alternate' },
            { label: '常规', value: 'normal' },
            { label: '反向', value: 'reverse' },
          ]
        },
        {
          type: EStyleConfigLabelType.Selection,
          mapTo: 'globalAnimation.infiniteAnimationTimingFunction',
          label: '动画时间函数',
          options: [
            { label: '线性', value: 'linear' },
            { label: 'ease-in-out', value: 'ease-in-out' },
            { label: 'ease', value: 'ease' },
            { label: 'ease-out', value: 'ease-out' },
          ]
        },
      ]
    }
  ]
}