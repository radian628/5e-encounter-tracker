import { DiceRollerEvaluatorInput } from "./DiceRollerUI";
import { StatusEffectsEditor } from "./StatusEffectsEditor";
import { Creature } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput, propSetter } from "./Util";

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
                <DiceRollerEvaluatorInput
                    className="hp-input"
                    value={props.creature.currentHP}
                    setValue={propSetter(props.creature, "currentHP")}
                ></DiceRollerEvaluatorInput>
                /
                <DiceRollerEvaluatorInput
                    className="hp-input"
                    value={props.creature.maxHP}
                    setValue={propSetter(props.creature, "maxHP")}
                ></DiceRollerEvaluatorInput>
                {/* <GenericPropertyNumberInput
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
                ></GenericPropertyNumberInput> */}
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