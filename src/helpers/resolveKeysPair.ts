import resolvePathFromHome from './resolvePathFromHome';

const publicExtensionExpression = /\.pub$/;

export default function resolveKeysPair(raw: string): { private: string; public: string } {
  let pathToPrivate;
  let pathToPublic;
  if (raw.match(publicExtensionExpression)) {
    pathToPrivate = raw.replace(publicExtensionExpression, '');
    pathToPublic = raw;
  } else {
    pathToPrivate = raw;
    pathToPublic = `${raw}.pub`;
  }

  return {
    private: resolvePathFromHome(pathToPrivate),
    public: resolvePathFromHome(pathToPublic),
  };
}
