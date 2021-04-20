import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/_shared/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginStatus, RegistrationStatus } from './JwtPayload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() data: { email: string; password: string },
  ): Promise<LoginStatus> {
    return await this.authService.login(data.email, data.password);
  }

  @Post('register')
  // @UseGuards(JwtAuthGuard)
  async register(
    @Body()
    data: {
      email: string;
      password: string;
      name: string;
      role: string;
      sendMail: boolean;
    },
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      data.email,
      data.password,
      data.role,
      data.name,
      data.sendMail,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('getUserByEmail')
  // @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Body() data: { email: string }): Promise<UserEntity> {
    const result: UserEntity = await this.authService.getOneUser(data.email);
    // if (!result.success) {
    //   throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    // }
    return result;
  }

  @Post('changePassword')
  // @UseGuards(JwtAuthGuard)
  async chanegPW(
    @Body() data: { email: string; password: string },
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.changePassword(
      data.email,
      data.password,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('editUser')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body() data: { email: string; name: string; role: string },
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.editUser(
      data.email,
      data.role,
      data.name,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get('getUsers')
  // @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<UserEntity[]> {
    return await this.authService.getAllUsers();
  }
}
