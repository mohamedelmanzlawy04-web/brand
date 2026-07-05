export function getSessionId(): string {
  let sessionId = localStorage.getItem("tidal_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("tidal_session_id", sessionId);
  }
  return sessionId;
}

export function getAdminToken(): string | null {
  return localStorage.getItem("tidal_admin_token");
}

export function setAdminToken(token: string) {
  localStorage.setItem("tidal_admin_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("tidal_admin_token");
}
