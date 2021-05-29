export class AddUserDto {
  cin: string;
  nom: string;
  prenom: string;
  email:string;
  password: string;
}

export class AddStudentDto extends AddUserDto{
  cne: string;
}
