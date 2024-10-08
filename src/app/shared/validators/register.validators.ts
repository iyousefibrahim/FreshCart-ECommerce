import { Validators } from "@angular/forms";

export const signupValidator = {
    name: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.pattern(/^\w{6,}$/)],
    phone: [Validators.required, Validators.pattern(/^01[0-1-2-5][0-9]{8}$/)]
}