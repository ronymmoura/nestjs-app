import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email).exec();
    if (user && user.password == password) {
      user.password = null;
      console.log(user);
      const payload = { user, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
