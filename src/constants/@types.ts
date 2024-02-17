export type CardType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
export type CardListType = Array<CardType>;

export type RegisterDataType = {
  email: string;
  password: string;
};

export type RegisterUserPayload = {
  data: RegisterDataType;
  callback: () => void;
};
