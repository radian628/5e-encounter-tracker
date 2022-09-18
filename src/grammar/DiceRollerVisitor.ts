// Generated from grammar/DiceRoller.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ParenthesizedContext } from "./DiceRollerParser";
import { BinopContext } from "./DiceRollerParser";
import { NumberContext } from "./DiceRollerParser";
import { ExprContext } from "./DiceRollerParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `DiceRollerParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface DiceRollerVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `Parenthesized`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesized?: (ctx: ParenthesizedContext) => Result;

	/**
	 * Visit a parse tree produced by the `Binop`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinop?: (ctx: BinopContext) => Result;

	/**
	 * Visit a parse tree produced by the `Number`
	 * labeled alternative in `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `DiceRollerParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
}

