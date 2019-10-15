import {DynamicContent} from '../dynamic-content/dynamic-content';

export interface DynamicElements {
  localeDynamicElements: LocaleDynamicElement[];
}

export interface LocaleDynamicElement {
  locale: string;
  dynamicElements: DynamicContent[];
}
