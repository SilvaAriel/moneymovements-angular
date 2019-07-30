import { IAccount } from './iaccount';

describe('Account', () => {
  it('should create an instance', () => {
    expect(new IAccount()).toBeTruthy();
  });
});
