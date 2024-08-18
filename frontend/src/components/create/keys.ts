export type IKey = {
  item: string;
  type: string;
  optionsData: string[];
  route?: string;
};

export const clientKeys: IKey[] = [
  {
    item: "Name",
    type: "input",
    optionsData: [],
  },
  {
    item: "Surname",
    type: "input",
    optionsData: [],
  },
  {
    item: "Email",
    type: "input",
    optionsData: [],
  },
  {
    item: "Password",
    type: "input",
    optionsData: [],
  },
  {
    item: "Number",
    type: "input",
    optionsData: [],
  },
  {
    item: "Type",
    type: "select",
    optionsData: ["client", "personal", "admin"],
  },
];

export const serviceKeys: IKey[] = [
  {
    item: "Photo",
    type: "photoInput",
    optionsData: [],
  },
  {
    item: "Name",
    type: "input",
    optionsData: [],
  },
  {
    item: "Description",
    type: "textarea",
    optionsData: [],
  },
  {
    item: "Price",
    type: "input",
    optionsData: [],
  },
  {
    item: "Duration",
    type: "input",
    optionsData: [],
  },
  {
    item: "Category",
    type: "input",
    optionsData: [],
  },
];

export const personalKeys: IKey[] = [
  {
    item: "Name",
    type: "input",
    optionsData: [],
  },
  {
    item: "Surname",
    type: "input",
    optionsData: [],
  },

  {
    item: "Salary",
    type: "input",
    optionsData: [],
  },
  {
    item: "Client_id",
    type: "select",
    optionsData: [],
    route: "user",
  },
];

export const medKeys: IKey[] = [
  {
    item: "Name",
    type: "input",
    optionsData: [],
  },
  {
    item: "Description",
    type: "textarea",
    optionsData: [],
  },
  {
    item: "Duration",
    type: "input",
    optionsData: [],
  },
  {
    item: "Price",
    type: "input",
    optionsData: [],
  },
  {
    item: "Photo",
    type: "photoInput",
    optionsData: [],
  },
  {
    item: "Doctor_id",
    type: "select",
    optionsData: [],
    route: "personnel",
  },
];

export const roomsKeys: IKey[] = [
  {
    item: "Number",
    type: "input",
    optionsData: [],
  },
  {
    item: "Type",
    type: "input",
    optionsData: ["One room", "Two rooms", "Three rooms"],
  },
  {
    item: "Price",
    type: "input",
    optionsData: [],
  },
  {
    item: "Photo",
    type: "photoInput",
    optionsData: [],
  },
  {
    item: "Description",
    type: "textarea",
    optionsData: [],
  },
];

export const medScheduleKeys: IKey[] = [
  {
    item: "Start",
    type: "input",
    optionsData: [],
  },
  {
    item: "End",
    type: "input",
    optionsData: [],
  },
  {
    item: "Procedure",
    type: "input",
    optionsData: [],
  },
  {
    item: "Doctor_id",
    type: "select",
    optionsData: [],
    route: "personnel",
  },
  {
    item: "Procedure_id",
    type: "select",
    optionsData: [],
    route: "med-services",
  },
];

export const mealKeys: IKey[] = [
  {
    item: "Day",
    type: "select",
    optionsData: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  {
    item: "Breakfast",
    type: "input",
    optionsData: [],
  },
  {
    item: "Dinner",
    type: "input",
    optionsData: [],
  },
  {
    item: "Supper",
    type: "input",
    optionsData: [],
  },
];
