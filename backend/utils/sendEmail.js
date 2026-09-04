const transporter = require("../config/mail");
const generateEmailTemplate = require("./emailTemplate");
const { smtp_User, client_Url } = require("../constants/secret");

// ==========================================
// 1. Send Verification Email
// ==========================================
const sendVerificationEmail = async (email, verificationToken) => {
  const emailData = {
    icon: "📧",
    title: "Verify Your Email Address",
    subtitle: "Welcome to Kroyshala!",
    message: "Thank you for creating an account. Please click the button below to verify your email and activate your account.",
    buttonText: "Verify Email",
    buttonColor: "#2563eb",
    buttonUrl: `${client_Url}/verify-email?token=${verificationToken}`,
    warningText: "This link expires in 15 minutes. If you didn't create this account, please ignore this email.",
  };

  const html = generateEmailTemplate(emailData);

  const mailOptions = {
    from: `"Kroyshala" <${smtp_User}>`,
    to: email,
    subject: "Verify Your Email - Kroyshala",
    html,
  };

  await transporter.sendMail(mailOptions);
};

// ==========================================
// 2. Send Password Reset Email
// ==========================================
const sendPasswordResetEmail = async (email, resetToken) => {
  const emailData = {
    icon: "🔐",
    title: "Reset Your Password",
    subtitle: "Password Recovery",
    message: "We received a request to reset your password. Click the button below to create a new password for your account.",
    buttonText: "Reset Password",
    buttonColor: "#dc2626",
    buttonUrl: `${client_Url}/reset-password?token=${resetToken}`,
    warningText: "This link expires in 15 minutes. If you didn't request this, please ignore this email.",
  };

  const html = generateEmailTemplate(emailData);

  const mailOptions = {
    from: `"Kroyshala" <${smtp_User}>`,
    to: email,
    subject: "Reset Your Password - Kroyshala",
    html,
  };

  await transporter.sendMail(mailOptions);
};

// ==========================================
// 3. Send Order Created Email
// ==========================================
const sendOrderCreatedEmail = async (userEmail, userName, order) => {
  const orderItemsHtml = order.orderItems.map((item) => `
    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
      <span style="color: #374151;">${item.name} × ${item.quantity}</span>
      <span style="color: #1f2937; font-weight: bold;">৳${item.price * item.quantity}</span>
    </div>
  `).join("");

  const extraDetails = `
    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px;">Order #${order._id}</p>
    ${orderItemsHtml}
    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 2px solid #e5e7eb; margin-top: 5px;">
      <span style="color: #1f2937; font-weight: bold;">Total</span>
      <span style="color: #2563eb; font-weight: bold; font-size: 18px;">৳${order.totalPrice}</span>
    </div>
  `;

  const emailData = {
    icon: "📦",
    title: "Order Placed Successfully!",
    subtitle: `Hi ${userName},`,
    message: "Your order has been placed successfully. We will notify you once it's confirmed.",
    buttonText: "View Order",
    buttonColor: "#16a34a",
    buttonUrl: `${client_Url}/orders/${order._id}`,
    extraDetails,
  };

  const html = generateEmailTemplate(emailData);

  const mailOptions = {
    from: `"Kroyshala" <${smtp_User}>`,
    to: userEmail,
    subject: `Order Placed - #${order._id}`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

// ==========================================
// 4. Send Order Confirmed Email
// ==========================================
const sendOrderConfirmedEmail = async (userEmail, userName, order) => {
  const emailData = {
    icon: "✅",
    title: "Order Confirmed!",
    subtitle: `Hi ${userName},`,
    message: "Great news! Your order has been confirmed and is now being prepared for shipment.",
    buttonText: "Track Order",
    buttonColor: "#16a34a",
    buttonUrl: `${client_Url}/orders/${order._id}`,
    extraDetails: `
      <p style="color: #6b7280; font-size: 14px; margin: 0;">Order #${order._id}</p>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0;">Total: ৳${order.totalPrice}</p>
    `,
  };

  const html = generateEmailTemplate(emailData);

  const mailOptions = {
    from: `"Kroyshala" <${smtp_User}>`,
    to: userEmail,
    subject: `Order Confirmed - #${order._id}`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

// ==========================================
// 5. Send Order Delivered Email
// ==========================================
const sendOrderDeliveredEmail = async (userEmail, userName, order) => {
  const emailData = {
    icon: "🎉",
    title: "Order Delivered!",
    subtitle: `Hi ${userName},`,
    message: "Your order has been delivered successfully. We hope you love your purchase!",
    buttonText: "Write a Review",
    buttonColor: "#7c3aed",
    buttonUrl: `${client_Url}/orders/${order._id}`,
    extraDetails: `
      <p style="color: #6b7280; font-size: 14px; margin: 0;">Order #${order._id}</p>
      <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0;">Total: ৳${order.totalPrice}</p>
    `,
  };

  const html = generateEmailTemplate(emailData);

  const mailOptions = {
    from: `"Kroyshala" <${smtp_User}>`,
    to: userEmail,
    subject: `Order Delivered - #${order._id}`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderCreatedEmail,
  sendOrderConfirmedEmail,
  sendOrderDeliveredEmail,
};