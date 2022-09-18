
import { DiceRollerEvaluatorInput } from "./DiceRollerUI";
import { StatusEffect } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput, propSetter } from "./Util";

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
        <DiceRollerEvaluatorInput
            value={props.statusEffect.remainingTurns}
            setValue={propSetter(props.statusEffect, "remainingTurns")}
        ></DiceRollerEvaluatorInput>
        <button
            onClick={props.deleteStatusEffect}
        >X</button>
    </div>
}