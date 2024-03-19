
export class Singleton<T> {
  private static instance: any | null = null;

  public static Instance<T>(c: { new (): T }): T {
    if (!this.instance) {
      this.instance = new c();
    }
    return this.instance;
  }
}
