// Generated from grammar/DiceRoller.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ParenthesizedContext } from "./DiceRollerParser";
import { BinopContext } from "./DiceRollerParser";
import { NumberContext } from "./DiceRollerParser";
import { ExprContext } from "./DiceRollerParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `DiceRollerParser`.
 */
export interface DiceRollerListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `Parenthesized`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	enterParenthesized?: (ctx: ParenthesizedContext) => void;
	/**
	 * Exit a parse tree produced by the `Parenthesized`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	exitParenthesized?: (ctx: ParenthesizedContext) => void;

	/**
	 * Enter a parse tree produced by the `Binop`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	enterBinop?: (ctx: BinopContext) => void;
	/**
	 * Exit a parse tree produced by the `Binop`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	exitBinop?: (ctx: BinopContext) => void;

	/**
	 * Enter a parse tree produced by the `Number`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by the `Number`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;
}

