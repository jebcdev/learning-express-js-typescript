import bcrypt from "bcryptjs";

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT as string) || 10;

const HashPassword = async (
    password: string
): Promise<string | void> => {
    try {
        const salt = await bcrypt.genSalt(BCRYPT_SALT);

        const hashedPassword = await bcrypt.hashSync(password, salt);

        if (!hashedPassword)
            return console.log(
                "Error hashing password",
                hashedPassword
            );

        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw new Error("Error hashing password");
    }
};

const ComparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean | void> => {
    try {
        const isMatch = await bcrypt.compareSync(
            password,
            hashedPassword
        );

        return isMatch;
    } catch (error) {
        console.log(error);
        throw new Error("Error comparing password");
    }
};

export const BcryptUtil = {
    HashPassword,
    ComparePassword,
};
