export interface Response {
  data: any;
  meta: {
    code: number;
    message: string;
    status: string;
  };
}
