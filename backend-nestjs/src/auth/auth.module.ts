import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/user.module';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    UsersModule,
    passportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: '600000s' },
      // signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
    }),
  ],
  providers: [AuthService, JWTStrategy],
  exports: [passportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
