export class Target4e {
    static async selectTarget(token: Token, icon: string) {
        // @ts-ignore
        return new Portal()
            .color("#ffffff")
            .texture(icon)
            .origin(token)
            .pick();
    }

    static async teleportTokenTo(token: Token, target: Token, icon: string) {
        // @ts-ignore
        return new Portal()
            .color("#ffffff")
            .texture(icon)
            .origin(token)
            .setLocation(target)
            .teleport()
    }
}