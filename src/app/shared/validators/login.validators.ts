import { Validators } from "@angular/forms";

export const loginValidator = {
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.pattern(/^\w{6,}$/)]
}