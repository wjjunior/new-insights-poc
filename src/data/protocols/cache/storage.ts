export interface Storage {
  set(key: string, value: any): Promise<void>;
  get(key: string, value?: any): Promise<string | null | void>
}
