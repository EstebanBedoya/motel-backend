import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser, UserDto } from '@app/common';
import { User } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-aurh.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserDto })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get a current user',
  })
  @ApiOkResponse({ type: UserDto })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
