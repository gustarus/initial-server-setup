import * as path from 'path';

export default function resolvePathFromHome(source: string) {
  if (source.match(/^~/)) {
    if (!process.env.HOME) {
      throw new Error('Unable to resolve path to home');
    }

    return path.resolve(process.env.HOME, source.replace(/^~[\\/]+/, ''));
  }

  return path.resolve(source);
}
