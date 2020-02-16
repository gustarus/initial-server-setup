import * as path from 'path';

export default function resolvePathFromHome(source: string) {
  if (source[0] === '~') {
    if (!process.env.HOME) {
      throw new Error('Unable to resolve path to home');
    }

    return path.resolve(process.env.HOME, source.slice(1));
  }

  return path.resolve(source);
}
