import { IsString, Matches } from "class-validator";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,24}$/

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  @Matches(PASSWORD_REGEX, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 to 24 characters long' })
  password: string;
}
