import { WebSocket } from "ws";

export type ServiceResponse = {
  error: string;
  code: number;
  accessToken: string;
  data?: any;
};

export type RegisterBody = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repPassword: string;
  number: string;
  type: string | undefined;
  accessToken: string | undefined;
};

export type LoginBody = {
  login: string;
  password: string;
};

export type AuthBody = {
  accessToken: string;
};

export type ProfileBody = {
  id: string;
  accessToken: string;
};

export type Client = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  number: number;
  photo: string;
  date_of_birth: Date;
  type: string;
  address: string;
  accessToken: string;
  refreshToken: string;
};

export type EditBody = {
  type: string;
  name: string;
  surname: string;
  accessToken: string;
};

export type EditPhotoBody = {
  photoName: string;
  accessToken: string;
};
