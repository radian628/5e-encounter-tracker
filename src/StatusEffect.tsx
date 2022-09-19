
import { DiceRollerEvaluatorInput } from "./DiceRollerUI";
import { StatusEffect } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput, propSetter } from "./Util";
import { help } from "./HelpBox";

export function StatusEffectEditor(props: {
    statusEffect: StatusEffect,
    setStatusEffect: (se: StatusEffect) => void,
    deleteStatusEffect: () => void
}) {
    return <div className="status-effect-container">
        <GenericPropertyTextInput<StatusEffect>
            onMouseEnter={help(<p>Status effect name.</p>)}
            className="resizing-text-input"
            getter={props.statusEffect}
            setter={props.setStatusEffect}
            prop={"name"}
        ></GenericPropertyTextInput>
        <DiceRollerEvaluatorInput
            onMouseEnter={help(<p>Rounds remaining on status effect. Automatically decreases when "Advance Round" button is clicked.</p>)}
            className="resizing-text-input"
            value={props.statusEffect.remainingTurns}
            setValue={propSetter(props.statusEffect, "remainingTurns")}
        ></DiceRollerEvaluatorInput>
        <button
            onMouseEnter={help(<p>Delete status effect.</p>)}
            onClick={props.deleteStatusEffect}
        >X</button>
    </div>
}