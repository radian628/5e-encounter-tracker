
export type StatusEffect = {
    name: string,
    remainingTurns: number
  }
  
  export type Creature = {
    name: string,
    currentHP: number,
    maxHP: number,
    statusEffects: StatusEffect[],
    key: number
  }