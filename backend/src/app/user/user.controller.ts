import { User } from '@common-types/User.type';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CurrentUser, Roles } from '@jwt-auth/decorators';
import { Role } from '@jwt-auth/enum';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddRolesDto } from '@user/dto/add-roles.dto';
import { CreateAddressDto } from '@user/dto/create-address.dto';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { RemoveRoleQuery } from '@user/dto/remove-role.query';
import { SetActiveAddressDto } from '@user/dto/set-active-address.dto';
import { UpdateAddressDto } from '@user/dto/update-address.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { UserService } from '@user/user.service';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ENDPOINTS.USER.ALL)
  async all() {
    return await this.userService.all();
  }

  @Roles(Role.User)
  @Get(ENDPOINTS.USER.INFO)
  async info(@CurrentUser() { id }: User) {
    return await this.userService.getBy({ id });
  }

  @Get(ENDPOINTS.USER.BY_ID)
  async byId(@Param('id') id: string) {
    return await this.userService.getBy({ id });
  }

  @Post(ENDPOINTS.USER.CREATE)
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Roles(Role.User)
  @Patch(ENDPOINTS.USER.UPDATE_SELF)
  async updateSelf(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    return await this.userService.update(user.id, dto);
  }

  @Patch(ENDPOINTS.USER.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @Delete(ENDPOINTS.USER.REMOVE)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Roles(Role.User)
  @Post(ENDPOINTS.USER.ADDRESS)
  async addAddress(@CurrentUser() user: User, @Body() dto: CreateAddressDto) {
    return await this.userService.addAddress(user.id, dto);
  }

  @Roles(Role.User)
  @Post(ENDPOINTS.USER.ACTIVE_ADDRESS)
  async setActiveAddress(@CurrentUser() user: User, @Body() dto: SetActiveAddressDto) {
    return await this.userService.setActiveAddress(user.id, dto);
  }

  @Roles(Role.User)
  @Patch(ENDPOINTS.USER.UPDATE_ADDRESS)
  async updateAddress(@Param('id') addressId: string, @CurrentUser() user: User, @Body() dto: UpdateAddressDto) {
    return await this.userService.updateAddress(user.id, addressId, dto);
  }

  @Roles(Role.User)
  @Delete(ENDPOINTS.USER.REMOVE_ADDRESS)
  async removeAddress(@CurrentUser() user: User, @Param('id') addressId: string) {
    return await this.userService.removeAddress(user.id, addressId);
  }

  @Roles(Role.Admin)
  @Post(ENDPOINTS.USER.ADD_ROLES)
  async addRoles(@Param('id') userId: string, @Body() dto: AddRolesDto) {
    return await this.userService.addRoles(userId, dto);
  }

  @Roles(Role.Admin)
  @Delete(ENDPOINTS.USER.REMOVE_ROLE)
  async removeRole(@Param('id') userId: string, @Query() query: RemoveRoleQuery) {
    return await this.userService.removeRole(userId, query.roleId);
  }
}
