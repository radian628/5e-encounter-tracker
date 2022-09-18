
import { DiceRollerEvaluatorInput } from "./DiceRollerUI";
import { StatusEffect } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput, propSetter } from "./Util";

export function StatusEffectEditor(props: {
    statusEffect: StatusEffect,
    setStatusEffect: (se: StatusEffect) => void,
    deleteStatusEffect: () => void
}) {
    return <div className="status-effect-container">
        <GenericPropertyTextInput<StatusEffect>
            className="resizing-text-input"
            getter={props.statusEffect}
            setter={props.setStatusEffect}
            prop={"name"}
        ></GenericPropertyTextInput>
        <DiceRollerEvaluatorInput
            className="resizing-text-input"
            value={props.statusEffect.remainingTurns}
            setValue={propSetter(props.statusEffect, "remainingTurns")}
        ></DiceRollerEvaluatorInput>
        <button
            onClick={props.deleteStatusEffect}
        >X</button>
    </div>
}