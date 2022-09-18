import { roll } from "./DiceRollerParser";
import { Creature } from "./Types";
import { GenericPropertyTextInput, propSetter } from "./Util";

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
        <GenericPropertyTextInput
            getter={props.template}
            setter={props.setTemplate}
            prop={"name"}
        ></GenericPropertyTextInput>
        <GenericPropertyTextInput
            getter={props.template}
            setter={props.setTemplate}
            prop={"hp"}
        ></GenericPropertyTextInput>
    </div>
}