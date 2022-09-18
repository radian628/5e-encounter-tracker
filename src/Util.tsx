import { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

export type KeysOfType<T, KeyType> = { [K in keyof T]: T[K] extends KeyType ? K : never }[keyof T]

export type Test = KeysOfType<{ a: string, b: number, c: string }, string>;

export function GenericPropertyTextInput<T>(props: {
    getter: T, setter: (t: T) => void, prop: KeysOfType<T, string>, autoFocus?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
    const contentEditableRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (contentEditableRef.current) {
            if (props.autoFocus) contentEditableRef.current.focus();
        }
    })
    return <ContentEditable
    //@ts-ignore
        html={props.getter[props.prop]}
        onChange={e => {
            props.setter({
                ...props.getter,
                [props.prop]: e.currentTarget.innerText
            })
        }}
        {...{ ...props, getter: undefined, setter: undefined, prop: undefined } }
        innerRef={contentEditableRef}
    ></ContentEditable>
}



/// note: switch back to <input>, find way to make resizable
export function GenericPropertyNumberInput<T>(props: {
    getter: T, setter: (t: T) => void, prop: KeysOfType<T, number>, ref2: (e: HTMLDivElement | ContentEditable | null) => void
} & React.HTMLAttributes<HTMLDivElement>) {
    return <ContentEditable
        onChange={e => {
            try {
                const num = Number(e.currentTarget.innerText);
                props.setter({
                    ...props.getter,
                    [props.prop]: isNaN(num) ? 0 : num
                })
            } catch {
                props.setter({
                    ...props.getter,
                    [props.prop]: 0
                })
            }
        }}
        {...{ ...props, getter: undefined, setter: undefined, prop: undefined } }
        //@ts-ignore
        html={props.getter[props.prop].toString()}
        //ref={props.ref}
    ></ContentEditable>
}


export function propSetter<T extends {}, K extends keyof T>(obj: T, key: K) {
    return (newValue: T[K]) => {
        return {
            ...obj,
            [key]: newValue
        };
    }
}