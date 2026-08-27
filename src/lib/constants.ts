// ===== API =====
export const SWAPI_BASE_URL = "https://swapi.info/api";
export const PAGE_SIZE = 10;

// ===== Auth =====
export const ACCESS_TOKEN_EXPIRY = "15m";
export const REFRESH_TOKEN_EXPIRY = "7d";
export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "sw-access-secret-demo-key";
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "sw-refresh-secret-demo-key";

export const MOCK_USER = {
  username: "admin",
  password: "password",
};

// ===== Species Color Map =====
export const SPECIES_COLORS: Record<string, string> = {
  Human: "hsl(215, 50%, 55%)",
  Droid: "hsl(42, 80%, 55%)",
  Wookiee: "hsl(25, 55%, 45%)",
  Rodian: "hsl(150, 45%, 42%)",
  Hutt: "hsl(80, 40%, 38%)",
  "Yoda's species": "hsl(140, 50%, 38%)",
  Trandoshan: "hsl(0, 45%, 42%)",
  "Mon Calamari": "hsl(200, 50%, 45%)",
  Ewok: "hsl(30, 50%, 40%)",
  Sullustan: "hsl(270, 30%, 45%)",
  Neimodian: "hsl(160, 40%, 38%)",
  Gungan: "hsl(180, 45%, 40%)",
  Toydarian: "hsl(220, 40%, 50%)",
  Dug: "hsl(10, 50%, 42%)",
  "Twi'lek": "hsl(280, 45%, 45%)",
  Aleena: "hsl(190, 40%, 42%)",
  Vulptereen: "hsl(330, 35%, 42%)",
  Xexto: "hsl(240, 35%, 48%)",
  Toong: "hsl(50, 45%, 42%)",
  Cerean: "hsl(300, 30%, 45%)",
  Nautolan: "hsl(170, 50%, 40%)",
  Zabrak: "hsl(0, 55%, 45%)",
  Tholothian: "hsl(260, 40%, 45%)",
  Iktotchi: "hsl(20, 45%, 42%)",
  Quermian: "hsl(60, 35%, 45%)",
  "Kel Dor": "hsl(35, 55%, 45%)",
  Chagrian: "hsl(230, 45%, 45%)",
  Geonosian: "hsl(40, 40%, 38%)",
  Mirialan: "hsl(130, 45%, 40%)",
  Clawdite: "hsl(110, 35%, 42%)",
  Besalisk: "hsl(15, 45%, 42%)",
  Kaminoan: "hsl(195, 50%, 50%)",
  Skakoan: "hsl(145, 35%, 40%)",
  Muun: "hsl(55, 30%, 45%)",
  Togruta: "hsl(350, 50%, 45%)",
  Kaleesh: "hsl(5, 50%, 40%)",
  "Pau'an": "hsl(250, 30%, 42%)",
  Unknown: "hsl(215, 50%, 55%)", // Same as Human — default fallback
};
