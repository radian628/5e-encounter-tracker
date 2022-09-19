import { roll } from "./DiceRollerParser";
import { Creature } from "./Types";
import { GenericPropertyTextInput, propSetter } from "./Util";
import {help } from "./HelpBox";

export type CreatureTemplate = {
    name: string,
    hp: string
}

let creatureIndexCounter = 0;
export function instantiateCreature(template: CreatureTemplate): Creature {
    const hp = roll(template.hp);
    return {
        name: template.name,
        currentHP: hp,
        maxHP: hp,
        statusEffects: [],
        key: creatureIndexCounter++
    }
}

export function CreatureTemplateEditor(props: {
    template: CreatureTemplate,
    setTemplate: (t: CreatureTemplate) => void
}) {

    return <div>
        <GenericPropertyTextInput<CreatureTemplate>
            onMouseEnter={help(<p>Creature name.</p>)}
            className="resizing-text-input"
            getter={props.template}
            setter={props.setTemplate}
            prop={"name"}
        ></GenericPropertyTextInput>
        <GenericPropertyTextInput<CreatureTemplate>
            onMouseEnter={help(<p>Randomized creature HP (uses same syntax as the Dice Roller). When a creature is created, the health dice are rolled.</p>)}
            className="resizing-text-input"
            getter={props.template}
            setter={props.setTemplate}
            prop={"hp"}
        ></GenericPropertyTextInput>
    </div>
}