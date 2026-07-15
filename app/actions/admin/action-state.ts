export interface ActionState<
  TData = undefined,
  TErrors extends Record<string, string> = Record<string, string>,
> {
  success: boolean;
  message?: string;
  data?: TData;
  errors?: Partial<TErrors>;
}
