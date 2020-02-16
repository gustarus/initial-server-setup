import Base from '../base/Base';
import getOptionsString from '../helpers/getOptionsString';

export namespace CommandSpace {
  export type Config = {
    parts: Part[];
  };

  export type Runtime = {
    wrap?: boolean;
  }

  export type Part = Command | string | boolean | { [key: string]: Part };
}

export default class Command extends Base<CommandSpace.Config> {

  public get defaults() {
    return { parts: [], wrap: false };
  }

  public compile(runtimeConfig: CommandSpace.Runtime = { wrap: false }): string {
    const prepared = this.config.parts.map((part) => {
      if (part instanceof Command) {
        // compile child command
        const child = part.compile({ ...runtimeConfig, wrap: true });

        if (runtimeConfig.wrap) {
          // wrap child command with quotes and add slashes
          return `'${child.replace('\'', '\\\'')}'`;
        }

        return child;
      } else if (typeof part === 'object') {
        return getOptionsString(part as { [key: string]: any });
      }

      return part;
    });

    return prepared.filter((value) => value).join(' ');
  }
};
