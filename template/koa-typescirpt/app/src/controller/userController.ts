interface Session {
    setSession: Test
}

interface Test {
    name: string,
    age: number
}


class UserController {
    static setSession(ctx) {
        let session: Session = ctx.session;
        let test: Test = {
            name: 'yanle',
            age: 30
        };
        session.setSession = test;
        return ctx.body = test;
    }

    static getSession(ctx) {
        let session: Session = ctx.session;
        return ctx.body = session.setSession;
    }
}

export default UserController