import { useEffect, useRef, useState } from "react";
import { roll } from "./DiceRollerParser";
import ContentEditable from "react-contenteditable";

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

    const [goToBottom, setGoToBottom] = useState(false);

    const rollerHistoryRef = useRef<HTMLDivElement | null>(null);

    const rollerInputRef = useRef<HTMLInputElement | null>(null);

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
        setGoToBottom(true);
    }

    useEffect(() => {
        if (rollerHistoryRef.current && goToBottom) {
            const elem = rollerHistoryRef.current;
            elem.scrollTop = elem.scrollHeight;
            setGoToBottom(false);
            // const child = elem.children[historyIndex];
            // if (child) {
            //     elem.scrollTop = (child as HTMLDivElement).clientTop - elem.scrollTop;
            // }
        }
    })

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

type OmitPropertiesOfType<T extends {}, OmitType> = { [K in keyof T]: Exclude<T[K], OmitType> }

function noUndefined<T extends {}>(obj: T): OmitPropertiesOfType<T, undefined> {
    //@ts-ignore
    return Object.fromEntries(Object.entries(obj).filter(entry => entry[1] !== undefined));
}

export function DiceRollerEvaluatorInput(props: {
    value: number,
    setValue: (n: number) => void;
    autoFocus?: boolean
} & React.HTMLAttributes<HTMLInputElement>) {
    const contentEditableRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (contentEditableRef.current) {
            if (props.autoFocus) contentEditableRef.current.focus();
        }
    })

    const [originallySetValue, setOriginallySetValue] = useState(props.value);


    const [code, setCode] = useState<string>(props.value.toString());
    const [isErr, setIsErr] = useState(false);

    if (originallySetValue != props.value) {
        setCode(props.value.toString());
        setOriginallySetValue(props.value);
    }

    useEffect(() => {
        if (!isNaN(Number(code))) {
            props.setValue(Number(code));
        }
    });

    function tryEval(text: string) {
        try {
            const result = roll(text);
            setCode(result.toString());
            setIsErr(false);
        } catch (err) {
            setIsErr(true);
        }
    }

    return <ContentEditable 
        innerRef={contentEditableRef}
        style={{ background: isErr ? "#FF0000" : "" }}
        {...noUndefined({ ...props, value: undefined, setValue: undefined }) }
        html={code}
        onChange={e => {
            setCode(e.currentTarget.innerText);
            setIsErr(false);
        }}
        onBlur={e => {
            tryEval(e.currentTarget.innerText);
        }}
        onKeyDown={e => {
            if (e.key == "Enter") {
                tryEval(e.currentTarget.innerText);
            }
        }}
    ></ContentEditable>
}