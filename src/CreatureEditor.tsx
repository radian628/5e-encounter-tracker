import React, { useState } from "react";
import { DiceRollerEvaluatorInput } from "./DiceRollerUI";
import { StatusEffectsEditor } from "./StatusEffectsEditor";
import { Creature, FocusedInput } from "./Types";
import { GenericPropertyNumberInput, GenericPropertyTextInput, propSetter } from "./Util";
import { help } from "./HelpBox";

type CreatureEditorProps =
{ 
    creature: Creature, 
    setCreature: (c: Creature) => void, 
    deleteCreature?: () => void,
    focusedInput: FocusedInput,
    setFocusedInput: (i: FocusedInput) => void,
    onFocus: (e: React.FocusEvent<HTMLTableRowElement, Element>) => void,
    isFocused: boolean,
    index: number,
    toggleSelected: () => void
    selected: boolean
}

export function CreatureEditor(props: CreatureEditorProps) {

    function shouldFocus(type: FocusedInput) {
        return props.isFocused && props.focusedInput == type;
    }

    return <tr
        onFocus={props.onFocus}
        style={{ backgroundColor: props.selected ? "#aaaaaa" : "" }}
    >
        <td
            onMouseEnter={help(
                <p>Click and drag on the blank space immediately to the left of the creature's "X" button to select multiple creatures. Selected creatures are highlighted in grey.</p>
            )}
        >
            <div className="row">
                <span 
                    onMouseEnter={e => {
                        console.log("btn:", e);
                        if (e.buttons >= 1) {
                            props.toggleSelected();
                        }
                    }}
                    onMouseDown={e => {
                        props.toggleSelected();
                    }}
                style={{ cursor: "pointer", userSelect: "none" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  
                {props.deleteCreature ? <button
                    onClick={props.deleteCreature}
                >X</button> : undefined}
                <GenericPropertyTextInput
                    autoFocus={shouldFocus(FocusedInput.NAME)}
                    className="resizing-text-input"
                    getter={props.creature}
                    setter={props.setCreature}
                    prop="name"
                    onFocus={e => props.setFocusedInput(FocusedInput.NAME)}
                ></GenericPropertyTextInput>
            </div>
        </td>
        <td
            onMouseEnter={help(<React.Fragment>
                <p>Creature HP supports the dice roller syntax--- for instance, if a creature has 123 HP and you want to heal 57 HP, you could type "123 + 57." This is then evaluated automatically when you either hit ENTER or edit something else.</p>
                <p>You can also navigate through creatures using the up/down arrow keys.</p>
            </React.Fragment>)}
        >
            <div className="hp">
                <DiceRollerEvaluatorInput
                    autoFocus={shouldFocus(FocusedInput.CURRENT_HP)}
                    className="hp-input"
                    value={props.creature.currentHP}
                    setValue={propSetter(props.creature, "currentHP")}
                    onFocus={() => props.setFocusedInput(FocusedInput.CURRENT_HP)}
                ></DiceRollerEvaluatorInput>
                /
                <DiceRollerEvaluatorInput
                    autoFocus={shouldFocus(FocusedInput.MAX_HP)}
                    className="hp-input"
                    value={props.creature.maxHP}
                    setValue={propSetter(props.creature, "maxHP")}
                    onFocus={() => props.setFocusedInput(FocusedInput.MAX_HP)}
                ></DiceRollerEvaluatorInput>
            </div>
        </td>
        <td>
            <StatusEffectsEditor
                onFocus={() => props.setFocusedInput(FocusedInput.OTHER)}
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