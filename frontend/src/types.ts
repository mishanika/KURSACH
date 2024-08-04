export type Response = {
  error: string;
  code: number;
  accessToken: string;
  data?: any;
};

export type LoginData = {
  login: string;
  password: string;
};

export type Player = {
  socket: null;
  id: string;
  publicInfo: {
    username: string;
    photo: string;
  };
  isInLobby: boolean;
  isCreator: boolean;
};

export type LobbyType = {
  id: string;
  players: Player[];
  creatorId: string;
};

export type Invite = {
  lobbyId: string;
  from: { photo: string; username: string };
  date: number;
};

export type ProfileInfo = {
  name: string;
  surname: string;
  photo: string;
  isEditable: boolean;
};

export type Friend = {
  username: string;
  photo: string;
};

export type PlayerData = {
  name: string;
  photo: string;
  money: number;
  cell: number;
  alive: boolean;
  x: number;
  y: number;
  color: string;
};
