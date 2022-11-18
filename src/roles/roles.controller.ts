import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dtp';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor (private roleService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.createRole(dto);
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value: string){
        return this.roleService.getRoleByValue(value);
    }
}
