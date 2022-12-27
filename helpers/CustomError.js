class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

module.exports = CustomError;

// class BadRequestError extends Error {
//     constructor(message) {
//         super(message);
//         this.status = 400;
//     }
// }

// class UnauthorizedError extends Error {
//     constructor(message) {
//         super(message);
//         this.status = 401;
//     }
// }

// class ForbiddenError extends Error {
//     constructor(message) {
//         super(message);
//         this.status = 403;
//     }
// }

// class NotFoundError extends Error {
//     constructor(message) {
//         super(message);
//         this.status = 404;
//     }
// }

// class ConflictError extends Error {
//     constructor(message) {
//         super(message);
//         this.status = 409;
//     }
// }
