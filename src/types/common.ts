export interface ContentDocument {
  id: string;
  title: string;
  content: string;
}

export interface Response {
  message: string;
  status: StatusResponse;  
}

export enum StatusResponse {
  SUCCESS = "success",
  ERROR = "error",
}