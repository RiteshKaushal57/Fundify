export function sanitizeUser(user) {
  if (!user) return null;
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    kycStatus: user.kycStatus,
    isVerified: user.isVerified,
    profileCompleted: user.profileCompleted,
    panNumber: user.panNumber,
    aadhaarNumber: user.aadhaarNumber,
    panDocument: user.panDocument,
    aadhaarDocument: user.aadhaarDocument,
    // add any other fields you want to expose
  };
}
