import { IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class PartnerDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;
}
