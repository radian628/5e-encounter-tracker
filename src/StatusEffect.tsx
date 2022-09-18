
import { StatusEffect } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput } from "./Util";

export function StatusEffectEditor(props: {
    statusEffect: StatusEffect,
    setStatusEffect: (se: StatusEffect) => void,
    deleteStatusEffect: () => void
}) {
    return <div className="status-effect-container">
        <GenericPropertyTextInput
            getter={props.statusEffect}
            setter={props.setStatusEffect}
            prop={"name"}
        ></GenericPropertyTextInput>
        <GenericPropertyNumberInput
            getter={props.statusEffect}
            setter={props.setStatusEffect}
            prop={"remainingTurns"}
            className="status-effect-turns number-input"
        ></GenericPropertyNumberInput>
        <button
            onClick={props.deleteStatusEffect}
        >X</button>
    </div>
}