import { IsString, IsNumber } from 'class-validator';

export class OwnerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;
}
