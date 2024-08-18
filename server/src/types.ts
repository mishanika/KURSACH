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

export type Personal = {
  name: string;
  surname: string;
  salary: string;
  client_id: string;
};

export type Room = {
  number: string;
  type: string;
  price: string;
  photo: string;
  description: string;
};

export type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
  photo: string;
  category: string;
};

export type MedService = {
  name: string;
  description: string;
  duration: string;
  price: string;
  photo: string;
  doctor_id: string;
};

export type MealSchedule = {
  day: string;
  breakfast: string;
  dinner: string;
  supper: string;
};

export type MedSchedule = {
  date: string;
  start: string;
  end: string;
  doctor_id: string;
  procedure_id: string;
};
