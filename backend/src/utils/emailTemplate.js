// ==========================================
// Dynamic Email Template Generator
// ==========================================
const generateEmailTemplate = (data) => {
  const {
    icon,
    title,
    subtitle,
    message,
    buttonText,
    buttonColor,
    buttonUrl,
    extraDetails = "",
    warningText = "",
  } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      
      <!-- Main Container -->
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 30px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">${icon}</div>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🛍️ Kroyshala</h1>
          <p style="color: #dbeafe; margin: 5px 0 0; font-size: 14px;">Your Trusted Shopping Partner</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Title -->
          <h2 style="color: #1f2937; margin: 0 0 10px; font-size: 22px; text-align: center;">
            ${title}
          </h2>
          
          <!-- Subtitle -->
          ${subtitle ? `
            <p style="color: #6b7280; margin: 0 0 20px; font-size: 16px; text-align: center;">
              ${subtitle}
            </p>
          ` : ""}
          
          <!-- Message -->
          <p style="color: #4b5563; margin: 0 0 25px; font-size: 15px; line-height: 1.6; text-align: center;">
            ${message}
          </p>
          
          <!-- Extra Details (Order info etc) -->
          ${extraDetails ? `
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 0 0 25px;">
              ${extraDetails}
            </div>
          ` : ""}
          
          <!-- Button -->
          ${buttonText && buttonUrl ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${buttonUrl}" 
                 style="background-color: ${buttonColor}; 
                        color: #ffffff; 
                        padding: 14px 40px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-size: 16px;
                        font-weight: bold;
                        display: inline-block;">
                ${buttonText}
              </a>
            </div>
          ` : ""}
          
          <!-- Warning -->
          ${warningText ? `
            <div style="background-color: #fef3c7; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 13px; text-align: center;">
                ⚠️ ${warningText}
              </p>
            </div>
          ` : ""}
          
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 25px; text-align: center;">
          <p style="color: #6b7280; margin: 0 0 5px; font-size: 13px;">
            © 2026 Kroyshala. All rights reserved.
          </p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
        
      </div>
      
    </body>
    </html>
  `;
};

module.exports = generateEmailTemplate;