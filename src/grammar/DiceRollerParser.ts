// Generated from grammar/DiceRoller.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { DiceRollerListener } from "./DiceRollerListener";
import { DiceRollerVisitor } from "./DiceRollerVisitor";


export class DiceRollerParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly NUMBER = 8;
	public static readonly WS = 9;
	public static readonly RULE_expr = 0;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'-'", "'('", "')'", "'d'", "'*'", "'/'", "'+'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "NUMBER", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(DiceRollerParser._LITERAL_NAMES, DiceRollerParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return DiceRollerParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "DiceRoller.g4"; }

	// @Override
	public get ruleNames(): string[] { return DiceRollerParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return DiceRollerParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(DiceRollerParser._ATN, this);
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 0;
		this.enterRecursionRule(_localctx, 0, DiceRollerParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 11;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case DiceRollerParser.T__0:
			case DiceRollerParser.T__1:
				{
				_localctx = new ParenthesizedContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 4;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === DiceRollerParser.T__0) {
					{
					this.state = 3;
					(_localctx as ParenthesizedContext)._negative = this.match(DiceRollerParser.T__0);
					}
				}

				this.state = 6;
				this.match(DiceRollerParser.T__1);
				this.state = 7;
				(_localctx as ParenthesizedContext)._inner = this.expr(0);
				this.state = 8;
				this.match(DiceRollerParser.T__2);
				}
				break;
			case DiceRollerParser.NUMBER:
				{
				_localctx = new NumberContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 10;
				(_localctx as NumberContext)._number = this.match(DiceRollerParser.NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 24;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 22;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
					case 1:
						{
						_localctx = new BinopContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BinopContext)._lhs = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DiceRollerParser.RULE_expr);
						this.state = 13;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 14;
						(_localctx as BinopContext)._op = this.match(DiceRollerParser.T__3);
						this.state = 15;
						(_localctx as BinopContext)._rhs = this.expr(5);
						}
						break;

					case 2:
						{
						_localctx = new BinopContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BinopContext)._lhs = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DiceRollerParser.RULE_expr);
						this.state = 16;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 17;
						(_localctx as BinopContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === DiceRollerParser.T__4 || _la === DiceRollerParser.T__5)) {
							(_localctx as BinopContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 18;
						(_localctx as BinopContext)._rhs = this.expr(4);
						}
						break;

					case 3:
						{
						_localctx = new BinopContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BinopContext)._lhs = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DiceRollerParser.RULE_expr);
						this.state = 19;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 20;
						(_localctx as BinopContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === DiceRollerParser.T__0 || _la === DiceRollerParser.T__6)) {
							(_localctx as BinopContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 21;
						(_localctx as BinopContext)._rhs = this.expr(3);
						}
						break;
					}
					}
				}
				this.state = 26;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 0:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);

		case 1:
			return this.precpred(this._ctx, 3);

		case 2:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\v\x1E\x04\x02" +
		"\t\x02\x03\x02\x03\x02\x05\x02\x07\n\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x05\x02\x0E\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x07\x02\x19\n\x02\f\x02\x0E\x02\x1C\v\x02" +
		"\x03\x02\x02\x02\x03\x02\x03\x02\x02\x02\x04\x03\x02\x07\b\x04\x02\x03" +
		"\x03\t\t\x02!\x02\r\x03\x02\x02\x02\x04\x06\b\x02\x01\x02\x05\x07\x07" +
		"\x03\x02\x02\x06\x05\x03\x02\x02\x02\x06\x07\x03\x02\x02\x02\x07\b\x03" +
		"\x02\x02\x02\b\t\x07\x04\x02\x02\t\n\x05\x02\x02\x02\n\v\x07\x05\x02\x02" +
		"\v\x0E\x03\x02\x02\x02\f\x0E\x07\n\x02\x02\r\x04\x03\x02\x02\x02\r\f\x03" +
		"\x02\x02\x02\x0E\x1A\x03\x02\x02\x02\x0F\x10\f\x06\x02\x02\x10\x11\x07" +
		"\x06\x02\x02\x11\x19\x05\x02\x02\x07\x12\x13\f\x05\x02\x02\x13\x14\t\x02" +
		"\x02\x02\x14\x19\x05\x02\x02\x06\x15\x16\f\x04\x02\x02\x16\x17\t\x03\x02" +
		"\x02\x17\x19\x05\x02\x02\x05\x18\x0F\x03\x02\x02\x02\x18\x12\x03\x02\x02" +
		"\x02\x18\x15\x03\x02\x02\x02\x19\x1C\x03\x02\x02\x02\x1A\x18\x03\x02\x02" +
		"\x02\x1A\x1B\x03\x02\x02\x02\x1B\x03\x03\x02\x02\x02\x1C\x1A\x03\x02\x02" +
		"\x02\x06\x06\r\x18\x1A";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!DiceRollerParser.__ATN) {
			DiceRollerParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(DiceRollerParser._serializedATN));
		}

		return DiceRollerParser.__ATN;
	}

}

export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DiceRollerParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenthesizedContext extends ExprContext {
	public _negative!: Token;
	public _inner!: ExprContext;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DiceRollerListener): void {
		if (listener.enterParenthesized) {
			listener.enterParenthesized(this);
		}
	}
	// @Override
	public exitRule(listener: DiceRollerListener): void {
		if (listener.exitParenthesized) {
			listener.exitParenthesized(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DiceRollerVisitor<Result>): Result {
		if (visitor.visitParenthesized) {
			return visitor.visitParenthesized(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinopContext extends ExprContext {
	public _lhs!: ExprContext;
	public _op!: Token;
	public _rhs!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DiceRollerListener): void {
		if (listener.enterBinop) {
			listener.enterBinop(this);
		}
	}
	// @Override
	public exitRule(listener: DiceRollerListener): void {
		if (listener.exitBinop) {
			listener.exitBinop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DiceRollerVisitor<Result>): Result {
		if (visitor.visitBinop) {
			return visitor.visitBinop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberContext extends ExprContext {
	public _number!: Token;
	public NUMBER(): TerminalNode { return this.getToken(DiceRollerParser.NUMBER, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DiceRollerListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: DiceRollerListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DiceRollerVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


