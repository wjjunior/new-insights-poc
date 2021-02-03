export interface Storage {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<string | null | void>
}
