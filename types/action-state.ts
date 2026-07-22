export type ActionState<
  TData = undefined,
  TErrors = undefined,
> = {
  success: boolean;
  message?: string;
  data?: TData;
  errors?: TErrors;
};