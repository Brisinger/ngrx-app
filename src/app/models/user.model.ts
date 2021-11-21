export class User {
    constructor(
        private email: string,
        private token: string,
        private localId: string,
        private expirationDate: Date,
    ) { }

    get expireDate(): Date {
        return this.expirationDate;
    }

    get userData(): { email: string, token: string, localId: string, expirationDate: Date} {
        return {
            email: this.email,
            token: this.token,
            localId: this.localId,
            expirationDate: this.expirationDate
        };
    }

    get userToken(): string {
        return this.token;
    }
}