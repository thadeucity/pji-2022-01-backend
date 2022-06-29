import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string = ''): Promise<string> {
    return payload.split('').reverse().join('');
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const hashedPayload = await this.generateHash(payload);
    return hashedPayload === hashed;
  }
}
