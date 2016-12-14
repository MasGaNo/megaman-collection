export interface ILoaderItem {
    execute(args?: any): Promise<any>; 
};

export abstract class ALoader {
    abstract load(path: string): ILoaderItem;
}

export default ALoader;