export interface IUser {
  id?: number;
  username: string;
  email: string;
  password?: string;
  phone?: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address?: {
    geolocation?: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
}
