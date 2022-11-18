import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ValidationPipe } from 'src/pipes/validationPipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: [User]})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Add role'})
    @ApiResponse({status: 200})
    @Post('/role')
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Post('/ban')
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    ban(@Body() dto: BanUserDto){
        return this.usersService.ban(dto);
    }
}
