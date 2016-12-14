export interface IApi {
    execute(id: string): Promise<any>;
}


export abstract class AApi implements IApi {
    abstract execute(...args:any[]): Promise<any>;
}

export default AApi;