import Command from '../models/Command';
export default function createPlaybookCommand(host: string, user: string, key: string, path: string): Command<{
    formatter: import("../models/Formatter").default<{}>;
    parts: (string | {
        inventory: string;
        user?: undefined;
        'private-key'?: undefined;
        e?: undefined;
    } | {
        user: string;
        inventory?: undefined;
        'private-key'?: undefined;
        e?: undefined;
    } | {
        'private-key': string;
        inventory?: undefined;
        user?: undefined;
        e?: undefined;
    } | {
        e: string;
        inventory?: undefined;
        user?: undefined;
        'private-key'?: undefined;
    })[];
}>;
