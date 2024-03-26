import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  boardId: number;
}