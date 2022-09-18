export enum FocusedInput {
  NAME, CURRENT_HP, MAX_HP, OTHER
}

export type StatusEffect = {
    name: string,
    remainingTurns: number,
    key: number
  }
  
  export type Creature = {
    name: string,
    currentHP: number,
    maxHP: number,
    statusEffects: StatusEffect[],
    key: number
  }