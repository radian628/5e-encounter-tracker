import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { CreatureEditor } from './CreatureEditor'
import { Creature, FocusedInput } from './Types';
import { roll } from './DiceRollerParser';
import { DiceRollerEvaluatorInput, DiceRollerUI } from './DiceRollerUI';
import { CreatureTemplate, CreatureTemplateEditor, instantiateCreature } from './CreatureTemplate';


let key = 0;
function uniqueKey() {
  return key++;
}

function App() {
  const [count, setCount] = useState(0); 

  //console.log(roll("2d6"));

  const [template, setTemplate] = useState<CreatureTemplate>({
    name: "Goblin",
    hp: "2d6"
  });

  const [creaturesToAddCount, setCreaturesToAddCount] = useState(1);

  const [creatures, setCreatures] = useState<Creature[]>([
    {
      name: "test",
      currentHP: 10,
      maxHP: 10,
      statusEffects: [
        { name: "status effect", remainingTurns: 4, key: -1 }
      ],
      key: -5
    }
  ]);

  const [focusedCreatureInput, setFocusedCreatureInput] = useState(FocusedInput.OTHER);
  const [focusedCreatureIndex, setFocusedCreatureIndex] = useState<number | undefined>(undefined);
console.log(focusedCreatureIndex);
  return (
    <div className="App">
      <h1>5e Encounter Tracker</h1>
      <div className="main">
        <div>
          <h2>Dice Roller</h2>
          <DiceRollerUI></DiceRollerUI>
        </div>
        <div>
          <h2>Creatures</h2>
          <table>
            <tbody 
              // onBlur={e => {
              //   setFocusedCreatureIndex(undefined);
              // }}
              onKeyDown={e => {
                if (e.key == "ArrowDown" && focusedCreatureIndex !== undefined) {
                  console.log(focusedCreatureIndex, "pressed down arrow");
                  setFocusedCreatureIndex(Math.min(focusedCreatureIndex + 1, creatures.length - 1));
                }
                if (e.key == "ArrowUp" && focusedCreatureIndex !== undefined) {
                  console.log(focusedCreatureIndex, "pressed up arrow");
                  setFocusedCreatureIndex(Math.max(focusedCreatureIndex - 1, 0));
                }
              }}
            >
              <tr>
                <th>Name</th>
                <th>HP</th>
                <th>Status Effects</th>
              </tr>
              {
                creatures.map((c, i) => {
                  console.log("is focused?", i == focusedCreatureIndex, "index", i);
                  return <CreatureEditor
                    index={i}
                    creature={c}
                    setCreature={creature => {
                      setCreatures(creatures.map((c2, i2) => (i2 == i) ? creature : c2));
                    }}
                    key={c.key}
                    deleteCreature={() => {
                      setCreatures(creatures.filter((c2, i2) => (i != i2)));
                    }}
                    focusedInput={focusedCreatureInput}
                    setFocusedInput={e => {
                      console.log("focusedinput", e, "index", i);
                      setFocusedCreatureInput(e);
                    }}
                    onFocus={e => {
                      setFocusedCreatureIndex(i);
                      console.log("onFocus called for", i);
                    }}
                    isFocused={i == focusedCreatureIndex}
                  ></CreatureEditor>
                })
              }
            </tbody>
          </table>
        </div>





        <div>
          <h2>Controls</h2>
          <button
            onClick={e => {
              setCreatures(creatures.map(creature => {
                return {
                  ...creature,
                  statusEffects: creature.statusEffects.map(effect => {return {
                    ...effect,
                    remainingTurns: effect.remainingTurns - 1
                  }}).filter(effect => effect.remainingTurns >= 0)
                }
              }));
            }}
          >Advance Round</button>
          <CreatureTemplateEditor
            template={template}
            setTemplate={setTemplate}
          ></CreatureTemplateEditor>
          <button
            onClick={() => {
              setCreatures([...creatures, instantiateCreature(template)]);
            }}
          >Add Creature</button>
          <button
            onClick={() => {
              setCreatures([...creatures, ...new Array(creaturesToAddCount).fill(0)
                .map(e => { return instantiateCreature(template) })]);
            }}
          >Add N Creatures</button>
          <DiceRollerEvaluatorInput
            value={creaturesToAddCount}
            setValue={setCreaturesToAddCount}
          ></DiceRollerEvaluatorInput>
        </div>
      </div>
    </div>
  )
}

export default App
