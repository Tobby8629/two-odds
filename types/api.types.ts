// types/api.types.ts

/**
 * Every endpoint wraps its payload as { success, data }, so responses are
 * unwrapped once at the service boundary before the contents are used.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
