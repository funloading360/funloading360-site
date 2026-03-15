/**
 * SMS Templates & Functions
 * Integration with Twilio for booking confirmations
 */

export interface BookingSMSData {
  phone: string;
  name: string;
  productName: string;
  tier: string;
  date: string;
  totalPrice: number;
}

/**
 * Generate SMS confirmation message
 * Keep under 160 characters for single SMS, or use multipart
 */
export function generateConfirmationSMS(data: BookingSMSData): string {
  const dateObj = new Date(data.date);
  const dateStr = dateObj.toLocaleDateString("ro-RO", {
    month: "short",
    day: "numeric",
  });

  return `Mulțumesc ${data.name}! Am primit rezervarea pentru ${data.productName} (${data.tier}) pe ${dateStr}. Vei primi oferta în 5 min. Dezinformare? +447482112110 - FunLoading360`;
}

/**
 * Send SMS confirmation (Twilio)
 * Currently stubbed - integrate with Twilio API
 */
export async function sendConfirmationSMS(data: BookingSMSData): Promise<void> {
  try {
    const message = generateConfirmationSMS(data);

    // TODO: Integrate with Twilio API
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    //
    // if (!accountSid || !authToken || !fromNumber) {
    //   throw new Error('Twilio configuration missing');
    // }
    //
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({
    //   body: message,
    //   from: fromNumber,
    //   to: data.phone,
    // });

    console.log(`[SMS] Confirmation SMS queued for ${data.phone}`);
    console.log(`[SMS] Message: ${message}`);
    return Promise.resolve();
  } catch (error) {
    console.error("[SMS ERROR]", error);
    // Don't throw - SMS failure shouldn't block booking
    console.warn("SMS sending failed, but booking was still processed");
  }
}

/**
 * Retry logic for SMS delivery
 * Implements 3x retry with exponential backoff
 */
export async function sendConfirmationSMSWithRetry(
  data: BookingSMSData,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<void> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sendConfirmationSMS(data);
      console.log(`[SMS RETRY] Success on attempt ${attempt}`);
      return;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`[SMS RETRY] Attempt ${attempt} failed:`, lastError.message);

      // Exponential backoff
      if (attempt < maxRetries) {
        const waitTime = delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  // Log final failure but don't throw
  console.error(
    `[SMS RETRY] All ${maxRetries} attempts failed. Last error:`,
    lastError?.message
  );
}
