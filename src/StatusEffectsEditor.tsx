import { StatusEffectEditor } from "./StatusEffect"
import { StatusEffect } from "./Types"

let statusEffectIndex = 0;

export function StatusEffectsEditor(props: {
    statusEffects: StatusEffect[],
    setStatusEffects: (se: StatusEffect[]) => void
}) {
    return <div className="status-effects-container">
        {
            props.statusEffects.map((e, i) => {
                return <StatusEffectEditor
                    statusEffect={e}
                    setStatusEffect={e2 => props.setStatusEffects(
                        props.statusEffects.map((e3, i3) => (i3 == i) ? e2 : e3)
                    )}
                    deleteStatusEffect={() => {
                        props.setStatusEffects(props.statusEffects.filter((e, i2) => (i != i2)));
                    }}
                    key={e.key}
                ></StatusEffectEditor>
            })
        }
        <button
            onClick={se => {
                props.setStatusEffects([...props.statusEffects, {
                    name: "",
                    remainingTurns: 1,
                    key: statusEffectIndex++
                }]);
            }}
        >+</button>
    </div>
}