function errorHandler(name: string) {
    return class extends Error {
        constructor(message: string) {
            super();
            this.name = name;
            this.message;
            this.stack = '';
        }
    };
}

export const DatabaseError = errorHandler('DatabaseError');


