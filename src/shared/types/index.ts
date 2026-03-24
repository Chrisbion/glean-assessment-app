export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
}
