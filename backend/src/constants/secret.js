require("dotenv").config();

const default_image_public_id=process.env.DEFAULT_USER_IMAGE_PUBLIC_ID;
const default_image_url = process.env.DEFAULT_USER_IMAGE_URL;
const smtp_User= process.env.SMTP_USER;
const smtp_Password=process.env.SMTP_PASS;
const client_Url = process.env.CLIENT_URL;
const jwtEmailVerificationKey=process.env.EMAIL_VERIFICATION_SECRET;
const jwtResetPasswordKey = process.env.JWT_RESET_PASSWORD_SECRET; // 🆕
module.exports = {
    default_image_public_id,
    default_image_url,
    smtp_User,
    smtp_Password,
    client_Url,
    jwtEmailVerificationKey,
    jwtResetPasswordKey
}
