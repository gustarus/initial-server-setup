import Command from '../models/Command';
import formatter from '../instances/formatter';

export default function createPlaybookCommand(host: string, user: string, key: string, path: string) {
  const parts = [
    'ansible-playbook',
    { inventory: `${host},` },
    { user },
    { 'private-key': key },
    path,
    { e: '"ansible_python_interpreter=/usr/bin/python3"' }
  ];

  return new Command({ formatter, parts });
}
