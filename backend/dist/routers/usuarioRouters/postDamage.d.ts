export declare const postDamageRouter: any;
export declare enum Types {
    steel = 0,
    water = 1,
    bug = 2,
    dragon = 3,
    electric = 4,
    ghost = 5,
    fire = 6,
    fairy = 7,
    ice = 8,
    fighting = 9,
    normal = 10,
    grass = 11,
    psychic = 12,
    rock = 13,
    dark = 14,
    ground = 15,
    poison = 16,
    flying = 17
}
export declare class CalculatorComponent {
    statsA: any[];
    tipo1A: string;
    tipo2A: string;
    statsD: any[];
    tipo1D: string;
    tipo2D: string;
    url: any;
    moveName: string;
    power: number;
    moveType: string;
    cat: string;
    dealDamage: number;
    damage(): void;
    stab(t1: string, t2: string, tm: string): 1 | 1.5;
    efectividad(firstPokeType: string, secondPokeType: string): number;
}
