import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoleService } from '@role/role.service';
import { CreateRoleDto } from '@role/dto/create-role.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.ROLE)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(ENDPOINTS.DEFAULT.ALL)
  async all() {
    return await this.roleService.all();
  }

  @Get(ENDPOINTS.DEFAULT.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.roleService.getBy({ id });
  }

  @Post(ENDPOINTS.DEFAULT.CREATE)
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }

  @Delete(ENDPOINTS.DEFAULT.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(id);
  }
}
