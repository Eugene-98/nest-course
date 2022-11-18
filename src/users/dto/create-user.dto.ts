import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {

    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @IsString({message: 'Must be string'})
    @IsEmail({}, {message: 'Must be email'})
    readonly email: string;

    @ApiProperty({example: 'qwerty', description: 'User password'})
    @IsString({message: 'Must be string'})
    @Length(4, 16, {message: 'must be longest than 4 and shorter 16'})
    readonly password: string;
}