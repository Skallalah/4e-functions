export class Character {
    private _actor : Actor;

    constructor(actor: any) {
        this._actor = actor;
    }

   

    public static fromActor(actor: any): Character {
        return new Character(actor);
    }

    public get currentToken(): Token | null {
        const tokens = this._actor.getActiveTokens(true);

        return tokens ? tokens[0] : null;
    }
    
    public getName() {
        return this._actor;
    }

    public getNothing() {
        return 'nothing';
    }
}