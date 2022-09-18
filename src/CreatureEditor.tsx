import { StatusEffectsEditor } from "./StatusEffectsEditor";
import { Creature } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput } from "./Util";

export function CreatureEditor(props: { creature: Creature, setCreature: (c: Creature) => void, deleteCreature?: () => void }) {
    return <tr>
        <td>
            {props.deleteCreature ? <button
                onClick={props.deleteCreature}
            >X</button> : undefined}
            <GenericPropertyTextInput
                getter={props.creature}
                setter={props.setCreature}
                prop="name"
            ></GenericPropertyTextInput>
        </td>
        <td>
            <div className="hp">
                <GenericPropertyNumberInput
                    getter={props.creature}
                    setter={props.setCreature}
                    prop="currentHP"
                    className="hp-input"
                ></GenericPropertyNumberInput>
                /
                <GenericPropertyNumberInput
                    getter={props.creature}
                    setter={props.setCreature}
                    prop="maxHP"
                    className="hp-input"
                ></GenericPropertyNumberInput>
            </div>
        </td>
        <td>
            <StatusEffectsEditor
                statusEffects={props.creature.statusEffects}
                setStatusEffects={se => {
                    props.setCreature({
                        ...props.creature,
                        statusEffects: se
                    });
                }}
            ></StatusEffectsEditor>
        </td>
    </tr>
}