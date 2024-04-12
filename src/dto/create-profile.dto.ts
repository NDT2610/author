import { IsString, IsEmail, IsPhoneNumber, IsInt, Min, Max } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(undefined  , { message: 'Invalid phone number' })
  phoneNumber: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsString()
  address: string;

  @IsString()
  gender: string;

  @IsInt()
  userId: number
}
