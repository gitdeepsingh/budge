export interface Register {
  email: string;
  firstName: string;
  lastName: string;
  passphrase: string;
}

export interface Login {
  email: string;
  passphrase: string;
}

export interface Profile {
  email: string;
}

export interface UserProfile {
  firstname: string ,
  lastname: string,
  email: string,
}

export interface Expense {
  userId: string | null,
  details: Object,
}
