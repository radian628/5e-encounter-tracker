import ContentEditable from "react-contenteditable";

export type KeysOfType<T, KeyType> = { [K in keyof T]: T[K] extends KeyType ? K : never }[keyof T]

export type Test = KeysOfType<{ a: string, b: number, c: string }, string>;

export function GenericPropertyTextInput<T>(props: {
    getter: T, setter: (t: T) => void, prop: KeysOfType<T, string>
} & React.HTMLAttributes<HTMLInputElement>) {
    return <input
    //@ts-ignore
        value={props.getter[props.prop]}
        onInput={e => {
            props.setter({
                ...props.getter,
                [props.prop]: e.currentTarget.value
            })
        }}
        {...{ ...props, getter: undefined, setter: undefined, prop: undefined } }
    ></input>
}



/// note: switch back to <input>, find way to make resizable
export function GenericPropertyNumberInput<T>(props: {
    getter: T, setter: (t: T) => void, prop: KeysOfType<T, number>
} & React.HTMLAttributes<HTMLInputElement>) {
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
    ></ContentEditable>
}
