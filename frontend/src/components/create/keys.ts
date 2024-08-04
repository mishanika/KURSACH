export type IKey = {
  item: string;
  type: string;
  data: string[];
  route?: string;
};

export const clientKeys: IKey[] = [
  {
    item: "Name",
    type: "input",
    data: [],
  },
  {
    item: "Surname",
    type: "input",
    data: [],
  },
  {
    item: "Email",
    type: "input",
    data: [],
  },
  {
    item: "Password",
    type: "input",
    data: [],
  },
  {
    item: "Number",
    type: "input",
    data: [],
  },
  {
    item: "Type",
    type: "select",
    data: ["client", "personal", "admin"],
  },
];

export const serviceKeys: IKey[] = [
  {
    item: "Photo",
    type: "photoInput",
    data: [],
  },
  {
    item: "Name",
    type: "input",
    data: [],
  },
  {
    item: "Description",
    type: "textarea",
    data: [],
  },
  {
    item: "Price",
    type: "input",
    data: [],
  },
  {
    item: "Duration",
    type: "input",
    data: [],
  },
  {
    item: "Category",
    type: "select",
    data: ["SPA", "Swimming", "Etc", "Etc", "Etc", "Etc"],
  },
];

export const personalKeys: IKey[] = [
  {
    item: "Name",
    type: "input",
    data: [],
  },
  {
    item: "Surname",
    type: "input",
    data: [],
  },

  {
    item: "Schedule",
    type: "input",
    data: [],
  },

  {
    item: "Salary",
    type: "input",
    data: [],
  },
  {
    item: "Client_id",
    type: "select",
    data: [],
    route: "user",
  },
];

export const medKeys: IKey[] = [
  {
    item: "Name",
    type: "input",
    data: [],
  },
  {
    item: "Description",
    type: "textarea",
    data: [],
  },
  {
    item: "Duration",
    type: "input",
    data: [],
  },
  {
    item: "Price",
    type: "input",
    data: [],
  },
  {
    item: "Photo",
    type: "photoInput",
    data: [],
  },
  {
    item: "Doctor_id",
    type: "select",
    data: [],
    route: "personnel/select",
  },
];

export const roomsKeys: IKey[] = [
  {
    item: "Number",
    type: "input",
    data: [],
  },
  {
    item: "Type",
    type: "input",
    data: ["One room", "Two rooms", "Three rooms"],
  },
  {
    item: "Price",
    type: "input",
    data: [],
  },
  {
    item: "Photo",
    type: "photoInput",
    data: [],
  },
  {
    item: "Description",
    type: "textarea",
    data: [],
  },
];

export const medScheduleKeys: IKey[] = [
  {
    item: "Date",
    type: "input",
    data: [],
  },
  {
    item: "Start",
    type: "input",
    data: [],
  },
  {
    item: "End",
    type: "input",
    data: [],
  },
  {
    item: "Procedure",
    type: "input",
    data: [],
  },
  {
    item: "Doctor_id",
    type: "input",
    data: [],
    route: "personnel/select",
  },
  {
    item: "Procedure_id",
    type: "input",
    data: [],
    route: "procedure/select",
  },
];

export const mealKeys: IKey[] = [
  {
    item: "Date",
    type: "input",
    data: [],
  },
  {
    item: "Breakfast",
    type: "input",
    data: [],
  },
  {
    item: "Dinner",
    type: "input",
    data: [],
  },
  {
    item: "Supper",
    type: "input",
    data: [],
  },
];
