import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCardDto{
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  @IsNotEmpty()
  listId: number;
}