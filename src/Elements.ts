import {Config} from "./Config.js";

export class Elements {
  static readonly values: Record<string, Element>;
  static readonly KEY: string = '_SELECTOR';

  public static getElements(config: typeof Config): {} {
    const f = Object.keys(config)
      .filter((k: string) => k?.includes(Elements.KEY))
      // .map((str: string) => str?.replace(Elements.KEY, ""))
      .reduce((acc: Record<string, Element>,str: string): Record<string, Element> => {
        // const key: keyof typeof Config = str;
        acc[str?.replace(Elements.KEY, "")] =
          document.querySelector(config[str as keyof typeof Config]) as HTMLElement;
        return acc;
      }, Elements.values)
    console.log(f);
    return  {

    }
  }
}