import { compare, hash } from 'bcryptjs';
import { inject } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';

export class User {
  private _password: string;

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    passwordHash?: string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  public async setPassword(pass: string, salt: number): Promise<void> {
    this._password = await hash(pass, salt);
  }

  public comparePassword(pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

    return result;
  }
}
