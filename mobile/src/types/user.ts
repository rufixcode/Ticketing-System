export type ApiUser = {
  id: number;
  name: string;
  email: string;
};

export type UsersResponse = {
  data: ApiUser[];
};
