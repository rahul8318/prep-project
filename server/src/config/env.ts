export const config = {
  get port() { return parseInt(process.env.PORT || "5000", 10); },
  get nodeEnv() { return process.env.NODE_ENV || "development"; },
  get clientUrl() { return process.env.CLIENT_URL || "http://localhost:5173"; },
  get jwt() {
    return {
      get secret() { return process.env.JWT_SECRET || "fallback_secret"; },
      get refreshSecret() { return process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret"; },
      get expire() { return process.env.JWT_EXPIRE || "15m"; },
      get refreshExpire() { return process.env.JWT_REFRESH_EXPIRE || "7d"; },
    };
  },
  get aiApiKey() { return process.env.AI_API_KEY || ""; },
};
