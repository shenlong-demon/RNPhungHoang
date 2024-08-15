import { Dto, Logger, Singleton } from '../index';

type DtoHandler = {
  dtoHandle: (dto: Dto<any | null>) => Promise<boolean>;
};
export default class BaseFacade<T> extends Singleton<T> {
  public static defaultHandlerFunc: () => DtoHandler;

  protected handler: any | null;

  constructor() {
    super();
  }

  public withHandler<T>(handler: any) {
    this.handler = handler;
    return this;
  }

  public async populate(dto: Dto<any | null>): Promise<Dto<any | null>> {
    const code: number = dto.getCode();
    Logger.log(() => [`BaseFacade populate code ${code}`, dto]);
    try {
      const handleFunc: Function | null | undefined =
        this.handler[`handle_${code}`];
      if (!!handleFunc) {
        await handleFunc(dto);
      }
    } catch (ex) {
    }
    try {
      await BaseFacade.defaultHandlerFunc().dtoHandle(dto);
    } catch (ex) {
    }

    return dto;
  }
}
