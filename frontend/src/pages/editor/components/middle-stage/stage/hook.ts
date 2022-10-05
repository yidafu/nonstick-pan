import {
  CSSProperties,
  RefObject, useCallback, useEffect, useState,
} from 'react';
import {
  fromEvent, interval, throttle,
} from 'rxjs';

import {
  STAGE_DEFAULT_PADDING, STAGE_RULRE_WIDTH,
} from '../constants';

import {
  useRuler, useScreenData,
} from '@/pages/editor/hooks';
import { toFixed } from '@/utils';

export function useStage(
  stageWrapperRef: RefObject<HTMLDivElement>,
  stageRef: RefObject<HTMLDivElement>,
) {
  const {
    width = 1920, height = 1080,
  } = useScreenData();
  const {
    updateOrigin, updateScale,
  } = useRuler();

  const [stageStyle, setStageStyle] = useState<CSSProperties>({
    width: `${width}px`,
    height: `${height}px`,
  });

  const resizeStage = useCallback(() => {
    if (stageWrapperRef.current && stageRef.current) {
      const wrapperRect = stageWrapperRef.current.getBoundingClientRect();
      // 舞台容器补偿了 32px 的外边距（避免ruler无法点击），这里不需要补偿
      const availableWidth = wrapperRect.width; // - STAGE_DEFAULT_PADDING * 2;
      const availableHeight = wrapperRect.height; // - STAGE_DEFAULT_PADDING * 2;
      const scaleX = availableWidth / width;
      const scaleY = availableHeight / height;
      // 保留到千分位，百分位有 10px 的误差
      const scale = toFixed(Math.min(scaleX, scaleY), 3);

      // 缩放后真实的像素偏差
      const originX = toFixed(availableWidth - width * scale, 3)
        / 2; // + STAGE_DEFAULT_PADDING;
      const originY = toFixed((availableHeight - height * scale), 3)
        / 2; // + STAGE_DEFAULT_PADDING;
      updateScale(scale);
      updateOrigin({
        x: originX + STAGE_DEFAULT_PADDING - STAGE_RULRE_WIDTH,
        y: originY + STAGE_DEFAULT_PADDING - STAGE_RULRE_WIDTH,
      });

      // scale() 会影响到 tanslate()，所以画布的偏移要是没有缩放前的值
      const stageOffsetX = toFixed(originX / scale, 3);
      const stageOffsetY = toFixed(originY / scale, 3);

      setStageStyle({
        width: `${width}px`,
        height: `${height}px`,
        transform: `scale(${scale}) translate(${stageOffsetX}px, ${stageOffsetY}px)`,
        transformOrigin: 'top left',
        // transformOrigin: `${STAGE_DEFAULT_PADDING}px ${STAGE_DEFAULT_PADDING}px`,
      });
    }
  }, [stageWrapperRef, stageRef, width, height, updateScale, updateOrigin]);

  useEffect(() => {
    resizeStage();
    const subscription = fromEvent(window, 'resize').pipe(throttle(() => interval(300)))
      .subscribe(() => {
        resizeStage();
      });

    return () => subscription.unsubscribe();
  }, [resizeStage]);

  return { stageStyle };
}
