import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
  create: jest.fn(),
  find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.IUserService).to(UserService);
  container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.IConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
  usersService = container.get<IUserService>(TYPES.IUserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
  it('createUser', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: User): UserModel => ({
        name: user.name,
        email: user.email,
        password: user.password,
        id: 1,
      }),
    );

    createdUser = await usersService.createUser({
      email: 'foo@bar.ru',
      name: 'Bruce',
      password: '123',
    });

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual('123');
  });

  it('validateUser - true', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

    const result = await usersService.validateUser({
      email: 'foo@bar.ru',
      password: '123',
    });

    expect(result).toBeTruthy();
  });

  it('validateUser - wrong pass', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

    const result = await usersService.validateUser({
      email: 'foo@bar.ru',
      password: 'qwerty',
    });

    expect(result).toBeFalsy();
  });

  it('validateUser - not find user', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(null);

    const result = await usersService.validateUser({
      email: 'foo@bar.ru',
      password: '123',
    });

    expect(result).toBeFalsy();
  });
});
