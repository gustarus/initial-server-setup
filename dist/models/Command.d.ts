import Base from '../base/Base';
export declare namespace CommandSpace {
    type Config = {
        parts: Part[];
    };
    type Runtime = {
        wrap?: boolean;
    };
    type Part = Command | string | boolean | {
        [key: string]: Part;
    };
}
export default class Command extends Base<CommandSpace.Config> {
    get defaults(): {
        parts: never[];
        wrap: boolean;
    };
    compile(runtimeConfig?: CommandSpace.Runtime): string;
}
