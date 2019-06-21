import { EffectNode } from '@audio/node.interface';

export interface FadeInOptions {
  target: GainNode;
  dest?: AudioNode;
  time: number;
  value?: number;
}

export function clamp(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

export function connectNodes(nodes: EffectNode[]) {
  for (let i = nodes.length - 1; i > 0; --i) {
    nodes[i - 1].connect(nodes[i]);
  }
}

export function mapToMinMax(value, min, max) {
  return value * (max - min) + min;
}

export function percentFromMinMax(value, min, max) {
  return ((value - min)) / (max - min);
}

export function expScale(value) {
  return Math.pow(Math.abs(value), 2);
}

export function gainFadeInConnect(options: FadeInOptions) {
  const value = options.value || options.target.gain.value;
  options.target.gain.value = 0;

  if (options.dest) {
    options.target.connect(options.dest);
  }

  options.target.gain.setTargetAtTime(value, options.time, 0.01);
}

export function toMs(value: number) {
  return value > 0 ? value / 1000 : 0;
}

export function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function equalCrossFade(value: number): number[] {
  const first = value === 1 ? 0 : Math.cos(value * 0.5 * Math.PI);
  const last = value === 0 ? 0 : Math.cos((1 - value) * 0.5 * Math.PI);

  return [first, last];
}

