import { GetAccessToken } from '@/domain/usecases/get-access-token'

export class GetAccessTokenMock implements GetAccessToken {
  accessToken: string;
  async get (value: string): Promise<void> {
    this.accessToken = value
  }
}
