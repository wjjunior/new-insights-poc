import { AccessToken } from '@/domain/usecases'

export class AccessTokenMock implements AccessToken {
  accessToken: string;
  async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }

  async get (value: string): Promise<void> {
    this.accessToken = value
  }
}
