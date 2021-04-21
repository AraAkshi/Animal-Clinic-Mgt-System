import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import { LoginStatus, JwtPayload, RegistrationStatus } from './JwtPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}

  async login(email: string, password: string): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(email, password);

    // generate and sign token
    const token = this._createToken(user.email);

    return {
      name: user.name,
      userrole: user.role,
      ...token,
    };
  }

  private _createToken(email: string): any {
    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRETKEY,
    });
    return { accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async register(
    email: string,
    password: string,
    role: string,
    name: string,
    sendMail: boolean,
  ): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      const user = await this.usersService.create(email, password, name, role);
      if (sendMail === true) {
        await this.mailService.sendUserConfirmation(
          email,
          name,
          password,
          'localhost:3000/login',
        );
      }
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async getOneUser(email: string): Promise<UserEntity> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Found User by Email',
    };
    try {
      const res = await this.usersService.getUserByEmail(email);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  async changePassword(
    email: string,
    password: string,
  ): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'password updated',
    };
    try {
      await this.usersService.changePassword(email, password);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async editUser(
    email: string,
    role: string,
    name: string,
  ): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'details updated',
    };
    try {
      await this.usersService.editUser(email, name, role);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async getAllUsers() {
    return await this.usersService.allUsers();
  }
}
