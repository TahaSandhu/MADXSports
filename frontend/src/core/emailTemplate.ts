export const generateVerificationEmailTemplate = (
  fullName: string,
  verifyUrl: string
) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<title>Verify Email</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;margin:40px auto;border-radius:12px;overflow:hidden;">

<tr>
<td
style="background:#d50000;padding:30px;text-align:center;color:#fff;font-size:30px;font-weight:bold;">
MADXSports
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#222;">
Hello ${fullName},
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
Thank you for creating your MADXSports account.
</p>

<p style="font-size:16px;color:#555;line-height:28px;">
Please click the button below to verify your email address.
</p>

<div style="text-align:center;margin:40px 0;">

<a
href="${verifyUrl}"
style="
background:#d50000;
color:#fff;
padding:16px 36px;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-size:16px;
font-weight:bold;
">
Verify Email
</a>

</div>

<p style="color:#777;font-size:14px;">
If you didn't create this account, you can safely ignore this email.
</p>

<hr style="margin:30px 0;border:none;border-top:1px solid #eee;" />

<p style="font-size:13px;color:#999;text-align:center;">
© ${new Date().getFullYear()} MADXSports
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};