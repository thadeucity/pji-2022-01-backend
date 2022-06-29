import BcryptHashProvider from '@providers/HashProvider/implementations/BCryptHashProvider';
const bcrypt = new BcryptHashProvider();

describe('BCrypt Hash Provider', () => {

  it('Should be able to hash a string', async () => {
    const unhashedString = 'any_string';
    const result = await bcrypt.generateHash(unhashedString);
    expect(result).not.toBe(unhashedString);
  });

  it('Should add salt to the Hash', async () => {
    const unhashedString = 'any_string';
    const result = await bcrypt.generateHash(unhashedString);
    const result2 = await bcrypt.generateHash(unhashedString);
    expect(result).not.toBe(result2);
  })

  it('Should be able to validate Valid hashes', async () => {
    const unhashedString = 'any_string';
    const hashedString = await bcrypt.generateHash(unhashedString);
    const result = await bcrypt.compareHash(unhashedString, hashedString);
    expect(result).toBe(true);
  })

  it('Should return false for Invalid hashes', async () => {
    const unhashedString = 'any_string';
    const hashedString = await bcrypt.generateHash(unhashedString);
    const result = await bcrypt.compareHash('invalid_string', hashedString);
    expect(result).toBe(false);
  })
})
