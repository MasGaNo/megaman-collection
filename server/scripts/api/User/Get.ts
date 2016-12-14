import { AApi } from '../index';

export class UserGetApi extends AApi {
    execute(id: string): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(JSON.stringify({
                    id: id,
                    name: 'toto'
                }));
            }, 1000);
        })
    }
}

export default UserGetApi;