import { IsNotEmpty, IsDateString, MaxLength } from 'class-validator';

export class ClubDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  foundationDate: Date;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
