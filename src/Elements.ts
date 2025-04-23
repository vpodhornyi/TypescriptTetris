import {Config} from "./Config.js";

export class Elements {
  static readonly values: Record<string, Element> = {};
  static readonly KEY: string = '_SELECTOR';

  public static getElements(config: typeof Config): {} {
    return Object.keys(config)
      .filter((k: string) => k?.includes(Elements.KEY))
      .reduce((acc: Record<string, Element>, str: string): Record<string, Element> => {
        const key: Config = config[str as keyof typeof Config];
        if (typeof key === 'string') {
          acc[str] = document.querySelector(key) as HTMLElement;
        }
        return acc;
      }, Elements.values)
  }
}