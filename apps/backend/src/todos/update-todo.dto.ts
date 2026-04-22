import { IsString, IsBoolean, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
