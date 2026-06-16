// ─── Web3Forms email utility ──────────────────────────────────────────────────
//
//  Usage:
//    const result = await sendContactEmail({ name, email, phone, ... })
//    if (result.success) { ... } else { console.error(result.message) }
//
// ─────────────────────────────────────────────────────────────────────────────
const ACCESS_KEY = "d55e762a-ae83-4bca-9f11-dec516ffce92";
const TO_EMAIL = "amitbhrampuriya@gmail.com";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
export interface ContactEmailPayload {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    problemDescription: string;
    expectation: string;
}
export interface SendEmailResult {
    success: boolean;
    message: string;
}
export async function sendContactEmail(
    payload: ContactEmailPayload
): Promise<SendEmailResult> {
    const formData = new FormData();
    // Web3Forms config
    formData.append("access_key", ACCESS_KEY);
    formData.append("to", TO_EMAIL);
    formData.append(
        "subject",
        `New Contact Request from ${payload.name} — SynthoraLabs`
    );
    // Honeypot field (spam prevention — must be empty)
    formData.append("botcheck", "");
    // Payload fields — Web3Forms includes every appended field in the email body
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone);
    formData.append("company_name", payload.companyName);
    formData.append("problem_description", payload.problemDescription);
    formData.append("expectation", payload.expectation);
    try {
        const response = await fetch(WEB3FORMS_URL, {
            method: "POST",
            body: formData,
        });
        const data = (await response.json()) as { success: boolean; message?: string };
        return {
            success: data.success,
            message: data.message ?? (data.success ? "Email sent successfully." : "Submission failed."),
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Network error — please check your connection and try again.",
        };
    }
}
