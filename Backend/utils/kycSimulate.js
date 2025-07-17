export function simulateKYC(panNumber, aadhaarNumber) {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadhaar = aadhaarNumber.replace(/\s+/g, '');
  const aadhaarRegex = /^\d{12}$/;
  return panRegex.test(panNumber) && aadhaarRegex.test(aadhaar);
}
