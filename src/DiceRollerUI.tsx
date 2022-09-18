import { useEffect, useRef, useState } from "react";
import { roll } from "./DiceRollerParser";

let keyindex = 0;

export function DiceRollerUI() {
    const [code, setCode] = useState("");
    
    const [diceRollerHistory, setDiceRollerHistory] = useState<
        ({ 
            code: string,
            result: number,
            index: number
        })[]
    >([]);

    const [historyIndex, setHistoryIndex] = useState(0);

    function executeRoll() {
        let rollResult: number;
        //try {
            rollResult = roll(code);
        // } catch (err) {
        //     rollResult = err;
        // }
        const newDRHEntry = {
            code,
            result: rollResult,
            index: keyindex++ 
        };
        setDiceRollerHistory([
            ...diceRollerHistory, 
            newDRHEntry
        ]);
        setCode("");
        setHistoryIndex(diceRollerHistory.length + 1);
    }

    const rollerHistoryRef = useRef<HTMLDivElement | null>(null);

    const rollerInputRef = useRef<HTMLInputElement | null>(null);

    return <div>
        <div className="dice-roller-history" ref={rollerHistoryRef}>
            {
                diceRollerHistory.map((data, i) => {
                    const { code, result, index} = data;
                    // if (typeof result != "string") {
                    //     return <div key={index}>
                    //         <span className="roll-result">ERR</span> {result[0]}
                    //     </div>
                    // }
                    return <div 
                        key={index} 
                        style={{ backgroundColor: (i == historyIndex) ? "#dddddd" : undefined }}
                        onClick={() => {
                            setHistoryIndex(i);
                            setCode(diceRollerHistory[i].code);
                            rollerInputRef.current?.focus();
                        }}
                    >
                        <span className="roll-result">{result.toString()}</span> {code}
                    </div>
                })
            }
        </div>
        <input
            ref={rollerInputRef}
            value={code}
            onInput={e => {
                setCode(e.currentTarget.value);
            }}
            onKeyDown={e => {
                if (e.key == "Enter") {
                    executeRoll();
                } else if (e.key == "ArrowUp") {
                    const newHistoryIndex = Math.max(historyIndex - 1, 0);
                    setHistoryIndex(newHistoryIndex);
                    setCode(diceRollerHistory[newHistoryIndex]?.code ?? "");
                } else if (e.key == "ArrowDown") {
                    const newHistoryIndex = Math.min(historyIndex + 1, diceRollerHistory.length);
                    setHistoryIndex(newHistoryIndex);
                    setCode(diceRollerHistory[newHistoryIndex]?.code ?? "");
                }
            }}
        ></input>
        <button
            onClick={() => {
                executeRoll();
            }}
        >Run</button>
    </div>
}