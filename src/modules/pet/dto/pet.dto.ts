import { IsString, IsNumber, IsEnum } from 'class-validator';
import { AnimalType } from 'src/utils/unions';

export class PetDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(AnimalType)
  animal: AnimalType;

  @IsNumber()
  ownerId: number;
}
