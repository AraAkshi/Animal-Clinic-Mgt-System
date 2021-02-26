import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findOne(options?: object): Promise<UserEntity> {
    const user = await this.repo.findOne(options);
    return user;
  }

  async findByLogin(email: string, password: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByPayload({ email }: any): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  async create(
    email: string,
    password: string,
    name: string,
    role: string,
  ): Promise<UserEntity> {
    // check if the user exists in the db
    const userInDb = await this.repo.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = this.repo.create({ email, password, role, name });
    await this.repo.save(user);
    return user;
  }

  async changePassword(email: string, password: string): Promise<UserEntity> {
    // check if the user exists in the db
    const userInDb = await this.repo.findOne({
      where: { email },
    });
    if (!userInDb) {
      throw new HttpException('User Not Found!', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    userInDb.password = hashedPassword;
    await this.repo.save(userInDb);
    return userInDb;
  }

  async allUsers() {
    return await this.repo.find();
  }
}
