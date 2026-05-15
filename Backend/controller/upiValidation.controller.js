const UPI_FORMAT_REGEX = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/;

const normalizeUpiId = (upiid = "") => upiid.trim().toLowerCase();

const hasRazorpayCredentials = () => {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
};

const formatValidationResult = (upiid) => {
  const normalized = normalizeUpiId(upiid);
  const isFormatValid = UPI_FORMAT_REGEX.test(normalized);

  return {
    normalized,
    isFormatValid,
    reason: isFormatValid ? "Valid UPI format" : "Invalid UPI format",
  };
};

const validateViaRazorpay = async (vpa) => {
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");

  const response = await fetch(
    process.env.RAZORPAY_VALIDATE_VPA_URL || "https://api.razorpay.com/v1/payments/validate/vpa",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vpa }),
    }
  );

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    return {
      ok: false,
      reason:
        payload?.error?.description ||
        payload?.description ||
        "UPI validation provider request failed",
      providerPayload: payload,
    };
  }

  // Razorpay typically returns `success` + optional `customer_name`.
  if (!payload.success) {
    return {
      ok: false,
      reason: payload?.description || "UPI ID not found on provider",
      providerPayload: payload,
    };
  }

  return {
    ok: true,
    accountHolderName: payload.customer_name || null,
    reason: "UPI ID verified by provider",
    providerPayload: payload,
  };
};

export const validateUpiCore = async (upiid) => {
  const formatResult = formatValidationResult(upiid);

  if (!formatResult.isFormatValid) {
    return {
      valid: false,
      normalizedUpiid: formatResult.normalized,
      source: "format",
      reason: formatResult.reason,
      accountHolderName: null,
    };
  }

  if (!hasRazorpayCredentials()) {
    return {
      valid: true,
      normalizedUpiid: formatResult.normalized,
      source: "format-only",
      reason: "Format valid. Provider credentials missing, network verification skipped.",
      accountHolderName: null,
    };
  }

  const providerResult = await validateViaRazorpay(formatResult.normalized);

  return {
    valid: providerResult.ok,
    normalizedUpiid: formatResult.normalized,
    source: "provider",
    reason: providerResult.reason,
    accountHolderName: providerResult.accountHolderName || null,
    providerPayload: providerResult.providerPayload,
  };
};

export const validateUpi = async (req, res) => {
  try {
    const { upiid } = req.body;

    if (!upiid) {
      return res.status(400).json({
        valid: false,
        message: "UPI ID is required",
      });
    }

    const result = await validateUpiCore(upiid);

    return res.status(200).json({
      valid: result.valid,
      upiid: result.normalizedUpiid,
      source: result.source,
      accountHolderName: result.accountHolderName,
      message: result.reason,
    });
  } catch (error) {
    console.log("UPI validation error:", error.message);
    return res.status(500).json({
      valid: false,
      message: "Unable to validate UPI ID right now",
    });
  }
};
