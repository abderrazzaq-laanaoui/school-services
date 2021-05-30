import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository:UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '-_TopSeCrRet@PassWord_-',
    });
  }

  async validate<T extends User>(payload:JwtPayload):Promise<T>{
    const {email} = payload;
    const user  = await this.userRepository.findOne({email})

    if(!user)
      throw new UnauthorizedException();

    return <T>user;
      
  }
}
