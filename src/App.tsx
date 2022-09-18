import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { CreatureEditor } from './CreatureEditor'
import { Creature } from './Types';
import { roll } from './DiceRollerParser';
import { DiceRollerUI } from './DiceRollerUI';
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
      currentHP: 5,
      maxHP: 10,
      statusEffects: [
        { name: "status effect", remainingTurns: 4 }
      ],
      key: uniqueKey()
    }
  ]);

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
            <tbody>
              <tr>
                <th>Name</th>
                <th>HP</th>
                <th>Status Effects</th>
              </tr>
              {
                creatures.map((c, i) => {
                  return <CreatureEditor
                    creature={c}
                    setCreature={creature => {
                      setCreatures(creatures.map((c2, i2) => (i2 == i) ? creature : c2));
                    }}
                    key={c.key}
                    deleteCreature={() => {
                      setCreatures(creatures.filter((c2, i2) => (i != i2)));
                    }}
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
          >Add N Creatures</button><input type="number"
            value={Number(creaturesToAddCount).toString()}
            onChange={e => {
              setCreaturesToAddCount(Number(e.currentTarget.value));
            }}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default App
