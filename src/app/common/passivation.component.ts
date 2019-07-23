import { BaseComponent } from './base.component';

export abstract class PassivationComponent<T> extends BaseComponent {
  data: T;

  constructor(private componentName: string) {
    super();
  }

  protected passivate(): void {
    localStorage.setItem(this.componentName, JSON.stringify(this.data));
  }

  protected setData(data: T): void {
    this.data = data;
  }

  protected activate(remove?: boolean): boolean {
    const storedDate = localStorage.getItem(this.componentName);
    if (storedDate) {
      this.data = JSON.parse(storedDate);

      if (remove) {
        localStorage.removeItem(this.componentName);
      }
      return true;
    } else {
      return false;
    }
  }

}
