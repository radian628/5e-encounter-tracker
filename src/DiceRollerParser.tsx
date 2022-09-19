import { CharStreams, CommonTokenStream, ParserErrorListener, RecognitionException, Recognizer, Token } from "antlr4ts";
import { ATNSimulator } from "antlr4ts/atn/ATNSimulator";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";

import { DiceRollerLexer } from "./grammar/DiceRollerLexer";
import { BinopContext, DiceRollerParser, NumberContext, ParenthesizedContext } from "./grammar/DiceRollerParser";
import { DiceRollerVisitor } from "./grammar/DiceRollerVisitor";

class DiceRollerRuntime 
extends AbstractParseTreeVisitor<number>
implements DiceRollerVisitor<number>{
    protected defaultResult(): number {
        return 0;
    }

    visitBinop(ctx: BinopContext) {
        const lhs = this.visit(ctx._lhs);
        const rhs = this.visit(ctx._rhs);
        if (ctx._op.text == "d") {
            let x = 0;
            for (let i = 0; i < Math.abs(lhs); i++) {
                x += (Math.floor(Math.random() * rhs) + 1) * Math.sign(lhs);
            }
            return x;
        }
        return {
            "+": lhs + rhs,
            "-": lhs - rhs,
            "*": lhs * rhs,
            "/": lhs / rhs
        }[ctx._op.text ?? ""] as number;
    }

    visitParenthesized(ctx: ParenthesizedContext) {
        return this.visit(ctx._inner) * ((ctx._negative.text == "-") ? -1 : 1);
    }

    visitNumber(ctx: NumberContext) {
        return Number(ctx.text);
    }
}

// class DiceRollerErrorListener implements ParserErrorListener {
//     syntaxError(
//         recognizer: Recognizer<Token, ATNSimulator>, 
//         offendingSymbol: Token | undefined, 
//         line: number, col: number, 
//         msg: string, err: RecognitionException | undefined) {
//         throw [msg, err];
//     }
// }

function compileDiceRollerExpr(input: string) {
    let lexer = new DiceRollerLexer(CharStreams.fromString(input));
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new DiceRollerParser(tokenStream);
    //parser.addErrorListener(new DiceRollerErrorListener());
    // try {
    let tree = parser.expr();
    return (new DiceRollerRuntime()).visit(tree);
    // } catch {
    //     throw 
    // }
}

export const roll = compileDiceRollerExpr;

//@ts-ignore
window.roll = compileDiceRollerExpr;