export interface ContentDocument {
  id: string;
  title: string;
  color?: string;
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

export interface ContextMenuItem {
  xPos: number;
  yPos: number;
}
