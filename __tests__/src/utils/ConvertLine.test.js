import ConvertLine from '../../../src/utils/ConvertLine';

describe('ConvertLine', () => {
  test('改行が\\nに変換されていること', () => {
    const text = `aaa
bbb

ccc`;
    const result = ConvertLine(text);
    expect(result).toBe('aaa\nbbb\n\nccc');
  });
});
