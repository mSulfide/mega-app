import { EScene } from "../Graph3D";

type TOption3D = {
    scene: EScene;
    text: string;
}

type TSelect3D = {
    scenes: TOption3D[];
    id: string;
    changeScene: (flag: EScene) => void;
}

const Select3D: React.FC<TSelect3D> = (props: TSelect3D) => {
    const { scenes, id, changeScene } = props;

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const flag = event.target.value as EScene;
        changeScene(flag);
    }

    return(<>
        <select onChange={selectChange} id={id}>
            {scenes.map((option: TOption3D, index: number) => {
                const { scene, text } = option;
                return(
                    <option key={index} value={scene}>{text}</option>
                );
            })}
        </select>
    </>)
}

export default Select3D;