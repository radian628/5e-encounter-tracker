grammar DiceRoller;
options {}


expr
    : '(' inner=expr ')'                  # Parenthesized
    | lhs=expr op='d' rhs=expr                 # Binop 
    | lhs=expr op=('*' | '/') rhs=expr         # Binop
    | lhs=expr op=('+' | '-') rhs=expr         # Binop
    | number=NUMBER                         # Number
    ;

NUMBER
    : 
    [0-9]'.'([0-9]*)
    | [1-9]([0-9]*)
    | '0'
    ;

WS
    : [\t\r\n ] -> skip ;