import Sex from "./Sex";

type Employee = {
  id?: string;
  firstName: string;
  lastName: string;
  age?: number;
  sex: Sex | '';
}

export default Employee