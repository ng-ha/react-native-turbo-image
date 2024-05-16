import React from 'react';
import {
  requireNativeComponent,
  NativeModules,
  type ProcessedColorValue,
  processColor,
} from 'react-native';
import type { TurboImageApi, TurboImageProps } from './types';

const { TurboImageViewManager } = NativeModules;
const ComponentName = 'TurboImageView';
interface Props extends Omit<TurboImageProps, 'monochrome' | 'tint'> {
  monochrome?: ProcessedColorValue | null;
  tint?: ProcessedColorValue | null;
}
const NativeImage = requireNativeComponent<Props>(ComponentName);

const TurboImage = (props: TurboImageProps) => {
  const {
    blurhash,
    cachePolicy,
    resizeMode,
    indicator,
    fadeDuration,
    borderRadius,
    rounded,
    blur,
    monochrome,
    resize,
    tint,
    onStart,
    onSuccess,
    onFailure,
    onCompletion,
    ...restProps
  } = props;
  return (
    <NativeImage
      {...restProps}
      blurhash={blurhash}
      cachePolicy={cachePolicy}
      resizeMode={resizeMode}
      indicator={indicator}
      fadeDuration={fadeDuration}
      borderRadius={borderRadius}
      rounded={rounded}
      blur={blur}
      monochrome={processColor(monochrome)}
      resize={resize}
      tint={processColor(tint)}
      onStart={onStart}
      onSuccess={onSuccess}
      onFailure={onFailure}
      onCompletion={onCompletion}
    />
  );
};

TurboImage.prefetch = async (sources: string[]) => {
  return await TurboImageViewManager.prefetch(sources);
};

TurboImage.clearMemoryCache = async () => {
  return await TurboImageViewManager.clearMemoryCache();
};
TurboImage.clearDiskCache = async () => {
  return await TurboImageViewManager.clearDiskCache();
};

export default TurboImage as React.FC<TurboImageProps> & TurboImageApi;
