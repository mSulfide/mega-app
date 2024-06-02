import { TF } from "../../Graph2D";

const useFunction = (): [(str: string) => TF, (f: TF) => string] => {

    const getFunction = (str: string): TF => {
        let f: TF = () => 0;
        try {
            eval(`f = x => ${str}`);
            return f;
        } catch {
            return f;
        }
    }

    const getFunctionBody = (f: TF): string => {
        return f.toString().split('=>')[1].replaceAll(' ', '');
    }

    return [getFunction, getFunctionBody];
}

export default useFunction;