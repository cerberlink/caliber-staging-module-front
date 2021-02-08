import { SwotItem } from './swot-item';

describe('SwotItem', () => {
  it('should create an instance', () => {
    expect(new SwotItem(1,'a','a', '', 1)).toBeTruthy();
  });
});
