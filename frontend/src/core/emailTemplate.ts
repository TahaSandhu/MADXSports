export const generateOtpEmailTemplate = (otp: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #ff1744;">MADXSports</h2>
    <p>Your verification code is:</p>
    <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 16px 0;">${otp}</div>
    <p style="color: #666; font-size: 13px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
  </div>
`;

export const generateOrderConfirmationTemplate = (order: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #ff1744;">MADXSports</h2>
    <p>Thanks for your order! Here's your confirmation:</p>
    <pre style="background: #f7f7f7; padding: 12px; border-radius: 6px; font-size: 13px;">${JSON.stringify(
    order,
    null,
    2
)}</pre>
  </div>
`;
