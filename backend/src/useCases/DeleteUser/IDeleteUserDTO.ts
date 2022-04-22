interface IDeleteUserDTO {
  userId: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export { IDeleteUserDTO };
