import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/util/Decorators/public';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Public()
  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (!user) throw new BadRequestException('Verifique seu usuário e senha.');
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new BadRequestException('Verifique seu usuário e senha.');
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
