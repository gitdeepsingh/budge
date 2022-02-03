export interface Register {
    email: String,
    firstName: String,
    lastName: String,
    passphrase: String
}

export interface Login {
    email: String,
    passphrase: String
}

export interface Profile {
    userId: String,
}