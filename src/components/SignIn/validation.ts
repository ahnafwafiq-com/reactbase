import PasswordValidator from "password-validator";

export default function validatePassword(password: string): {
    error: boolean;
    message: string;
} {
    const schema = new PasswordValidator();
    const res = {
        error: false,
        message: "",
    };
    schema
        .is()
        .min(8, "Password must have atleast 8 characters") // Minimum length 8
        .is()
        .max(100, "Password can't have more than 100 characters") // Maximum length 100
        .has()
        .uppercase(1, "Password must contain uppercase letters") // Must have uppercase letters
        .has()
        .lowercase(1, "Password must contain lowercase letters") // Must have lowercase letters
        .has()
        .digits(2, "Password must have atleast 2 numbers") // Must have at least 2 digits
        .has()
        .not()
        .spaces(0, "Password must not contain spaces"); // Should not have spaces
    if (!password) {
        res.error = true;
    }
    const validation = schema.validate(password, { details: true });
    if (Array.isArray(validation) && validation.length !== 0) {
        res.error = true;
        res.message = validation[0].message;
        return res;
    } else {
        res.message = "";
        res.error = false;
    }
    return res;
}
