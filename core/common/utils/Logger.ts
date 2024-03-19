export class Logger {
  public static log(func: () => any[]): void {
    const data: any[] = func();
    data.forEach((i) => {
      console.log(i);
    });
  }
}
