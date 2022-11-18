import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt/dist';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule) ,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService, 
    JwtModule
  ]
})
export class AuthModule {}
