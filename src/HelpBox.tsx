import { useEffect, useState } from "react"

let helpBoxText: string | JSX.Element = "";

export function setHelpBoxText(str: string | JSX.Element) {
    helpBoxText = str;
}

export function help(str: string | JSX.Element) {
    return () => {
        helpBoxText = str;
    }
}

export function endhelp() {
    helpBoxText = "";
}

export function HelpBox() {

    const [helpBoxState, setHelpBoxState] = useState<string | JSX.Element>(""); 

    useEffect(() => {
        const currentHelpBoxText = helpBoxText;
        function detectHelpBoxChange() {
            if (helpBoxText != currentHelpBoxText) {
                setHelpBoxState(helpBoxText);
            }
        }

        const timer = setInterval(detectHelpBoxChange, 30);
        return () => {
            clearInterval(timer);
        }
    });

    return <div style={{ width: "20vw" }}>
        <h2>Help</h2>
        {helpBoxState ? helpBoxState : <p>Mouse over something to see info about it here!</p>}
    </div>
}