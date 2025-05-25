import { PContainer } from "@labb/dx-engine";

export type ContainerConstructor<T extends PContainer> = (props: {
  container: T;
}) => JSX.Element | null;

export class DxVueAdapter {
  private static containerMapping: {
    [type: string]: any;
  } = {};

  public static registerMapping(name: string, implementation: any): void {
    this.containerMapping[name] = implementation;
  }

  public static getComponent(name: string): any {
    return this.containerMapping[name];
  }
}

