import api from '@/lib/axios'

export abstract class BaseApi {
  protected api = api

  protected async get<T>(path: string): Promise<T> {
    const response = await this.api.get<T>(path)
    return response.data
  }

  protected async post<T>(path: string, data: unknown): Promise<T> {
    const response = await this.api.post<T>(path, data)
    return response.data
  }

  protected async put<T>(path: string, data: unknown): Promise<T> {
    const response = await this.api.put<T>(path, data)
    return response.data
  }

  protected async patch<T>(path: string, data: unknown): Promise<T> {
    const response = await this.api.patch<T>(path, data)
    return response.data
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await this.api.delete<T>(path)
    return response.data
  }
}
