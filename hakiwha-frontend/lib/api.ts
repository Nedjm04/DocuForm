// API client for Laravel backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

interface ApiOptions {
  method?: RequestMethod
  body?: any
  token?: string
}

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, token } = options

  // Récupérer le token d'authentification du stockage local si non fourni
  const authToken = token || localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
  }

  if (body && (method === "POST" || method === "PUT")) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Une erreur est survenue")
    }

    return await response.json()
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

// API endpoints
export const api = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    apiRequest("login", { method: "POST", body: credentials }),

  logout: () => apiRequest("logout", { method: "POST" }),

  // Formations
  getFormations: (params?: any) => apiRequest(`formations${params ? `?${new URLSearchParams(params)}` : ""}`),

  getFormation: (id: number) => apiRequest(`formations/${id}`),

  createFormation: (data: any) => apiRequest("formations", { method: "POST", body: data }),

  updateFormation: (id: number, data: any) => apiRequest(`formations/${id}`, { method: "PUT", body: data }),

  deleteFormation: (id: number) => apiRequest(`formations/${id}`, { method: "DELETE" }),

  // Groupes
  getGroupes: (params?: any) => apiRequest(`groupes${params ? `?${new URLSearchParams(params)}` : ""}`),

  getGroupe: (id: number) => apiRequest(`groupes/${id}`),

  createGroupe: (data: any) => apiRequest("groupes", { method: "POST", body: data }),

  updateGroupe: (id: number, data: any) => apiRequest(`groupes/${id}`, { method: "PUT", body: data }),

  deleteGroupe: (id: number) => apiRequest(`groupes/${id}`, { method: "DELETE" }),

  // Sessions
  getSessions: (params?: any) => apiRequest(`sessions${params ? `?${new URLSearchParams(params)}` : ""}`),

  getSession: (id: number) => apiRequest(`sessions/${id}`),

  createSession: (data: any) => apiRequest("sessions", { method: "POST", body: data }),

  updateSession: (id: number, data: any) => apiRequest(`sessions/${id}`, { method: "PUT", body: data }),

  deleteSession: (id: number) => apiRequest(`sessions/${id}`, { method: "DELETE" }),

  // Documents
  generateDocument: (type: string, formationId: number) =>
    apiRequest("documents/generate", {
      method: "POST",
      body: { type, formation_id: formationId },
    }),

  getDocumentTemplates: () => apiRequest("documents/templates"),

  createDocumentTemplate: (data: any) => apiRequest("documents/templates", { method: "POST", body: data }),

  updateDocumentTemplate: (id: number, data: any) =>
    apiRequest(`documents/templates/${id}`, { method: "PUT", body: data }),

  deleteDocumentTemplate: (id: number) => apiRequest(`documents/templates/${id}`, { method: "DELETE" }),

  // Stagiaires
  getStagiaires: (params?: any) => apiRequest(`stagiaires${params ? `?${new URLSearchParams(params)}` : ""}`),

  getStagiaire: (id: number) => apiRequest(`stagiaires/${id}`),

  createStagiaire: (data: any) => apiRequest("stagiaires", { method: "POST", body: data }),

  updateStagiaire: (id: number, data: any) => apiRequest(`stagiaires/${id}`, { method: "PUT", body: data }),

  deleteStagiaire: (id: number) => apiRequest(`stagiaires/${id}`, { method: "DELETE" }),

  // Evaluations
  submitEvaluation: (data: any) => apiRequest("evaluations/submit", { method: "POST", body: data }),

  getEvaluations: (formationId: number) => apiRequest(`evaluations/formation/${formationId}`),

  // Certificats
  getCertificat: (userId: number) => apiRequest(`certificats/${userId}`),

  verifyCertificat: (uuid: string) => apiRequest(`certificats/verify/${uuid}`),

  // Statistiques
  getStats: (period = "month") => apiRequest(`stats?period=${period}`),

  // Paramètres
  getSettings: () => apiRequest("settings"),

  updateSettings: (data: any) => apiRequest("settings", { method: "PUT", body: data }),

  // Utilisateurs
  getUsers: () => apiRequest("users"),

  getUser: (id: number) => apiRequest(`users/${id}`),

  createUser: (data: any) => apiRequest("users", { method: "POST", body: data }),

  updateUser: (id: number, data: any) => apiRequest(`users/${id}`, { method: "PUT", body: data }),

  deleteUser: (id: number) => apiRequest(`users/${id}`, { method: "DELETE" }),
}
