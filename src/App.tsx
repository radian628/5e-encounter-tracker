import { createRef, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { CreatureEditor } from './CreatureEditor'
import { Creature, FocusedInput } from './Types';
import { roll } from './DiceRollerParser';
import { DiceRollerEvaluatorInput, DiceRollerUI } from './DiceRollerUI';
import { CreatureTemplate, CreatureTemplateEditor, instantiateCreature } from './CreatureTemplate';
import { GenericPropertyTextInput } from './Util';
import { help, HelpBox, endhelp } from './HelpBox';


let key = 0;
function uniqueKey() {
  return key++;
}

function App() {
  const [template, setTemplate] = useState<CreatureTemplate>({
    name: "Goblin",
    hp: "2d6"
  });

  const [round, setRound] = useState(1);

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

  const [settings, setSettings] = useState({
    deltaHP: "1d6",
    statusName: "Status Effect",
    statusRounds: 5
  });

  const [selectedCreatureKeys, setSelectedCreatureKeys] = useState<Set<number>>(new Set<number>());

  //const keyToIndexMap = new Map(creatures.map((c, i) => [c.key, i]));

  const [focusedCreatureInput, setFocusedCreatureInput] = useState(FocusedInput.OTHER);
  const [focusedCreatureIndex, setFocusedCreatureIndex] = useState<number | undefined>(undefined);

  function damageSelectedCreature() {
    setCreatures(creatures.map(
      c => {
        return {
          ...c,
          currentHP: selectedCreatureKeys.has(c.key) ? c.currentHP - roll(settings.deltaHP) : c.currentHP
        }
      }
    ))
  }


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
                  setFocusedCreatureIndex(Math.min(focusedCreatureIndex + 1, creatures.length - 1));
                }
                if (e.key == "ArrowUp" && focusedCreatureIndex !== undefined) {
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
                  return <CreatureEditor
                    selected={selectedCreatureKeys.has(c.key)}
                    toggleSelected={() => {
                      if (selectedCreatureKeys.has(c.key)) {
                        const newSet = new Set(selectedCreatureKeys);
                        newSet.delete(c.key);
                        setSelectedCreatureKeys(newSet);
                      } else {
                        const newSet = new Set(selectedCreatureKeys);
                        newSet.add(c.key);
                        setSelectedCreatureKeys(newSet);
                      }
                    }}
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
                      setFocusedCreatureInput(e);
                    }}
                    onFocus={e => {
                      setFocusedCreatureIndex(i);
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
          <div 
            className="ui-group"
            onMouseEnter={help(<p>
              Use the button to advance the round. This changes the "rounds remaining" for status effects on creatures. You can also change the round directly, but status effects will not be updated.
            </p>)}
          >
            <button
              onClick={e => {
                setRound(round + 1);
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
            <DiceRollerEvaluatorInput
              value={round}
              setValue={setRound}
              className="resizing-text-input"
            ></DiceRollerEvaluatorInput>
          </div>


          <div
            className="ui-group"
          >
            <CreatureTemplateEditor
              template={template}
              setTemplate={setTemplate}
            ></CreatureTemplateEditor>
            <button
              onMouseEnter={help(<p>Add a single creature to the encounter.</p>)}
              onClick={() => {
                setCreatures([...creatures, instantiateCreature(template)]);
              }}
            >Add Creature</button>
            <button
              onMouseEnter={help(<p>Add multiple creatures to the encounter. Health is rolled separately. Use the input below to change the number of creatures to add.</p>)}
              onClick={() => {
                setCreatures([...creatures, ...new Array(creaturesToAddCount).fill(0)
                  .map(e => { return instantiateCreature(template) })]);
              }}
            >Add N Creatures</button>
            <DiceRollerEvaluatorInput
              value={creaturesToAddCount}
              setValue={setCreaturesToAddCount}
              className="resizing-text-input"
            ></DiceRollerEvaluatorInput>
          </div>

          <div
            className="ui-group"
            onMouseEnter={help(<p>Decreases a group of creatures' health by a specified amount (use negative values for healing).</p>)}
          >
            <button
              onClick={() => {
              damageSelectedCreature();
              }}
            >Damage Selected by...</button>
            <GenericPropertyTextInput<typeof settings>
                className="resizing-text-input"
                getter={settings}
                setter={setSettings}
                prop={"deltaHP"}
                autoFocus={false}
                onKeyDown={e => {
                  if (e.key == "Enter") {
                    damageSelectedCreature();
                  }
                }}
            ></GenericPropertyTextInput>
          </div>
        </div>

        <HelpBox></HelpBox>
      </div>
    </div>
  )
}

export default App
