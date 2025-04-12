// Define all application routes for easy reference and maintenance

export const routes = {
  // Auth routes
  auth: {
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    register: "/auth/register",
  },

  // Admin routes
  admin: {
    dashboard: "/admin/dashboard",
    formations: {
      index: "/admin/formations",
      new: "/admin/formations/new",
      edit: (id: string | number) => `/admin/formations/${id}/edit`,
      view: (id: string | number) => `/admin/formations/${id}`,
    },
    groupes: {
      index: "/admin/groupes",
      new: "/admin/groupes/new",
      edit: (id: string | number) => `/admin/groupes/${id}/edit`,
      view: (id: string | number) => `/admin/groupes/${id}`,
      participants: (id: string | number) => `/admin/groupes/${id}/participants`,
    },
    sessions: {
      index: "/admin/sessions",
      new: "/admin/sessions/new",
      edit: (id: string | number) => `/admin/sessions/${id}/edit`,
      view: (id: string | number) => `/admin/sessions/${id}`,
      presence: (id: string | number) => `/admin/sessions/${id}/presence`,
    },
    documents: {
      index: "/admin/documents",
      certificats: "/admin/documents/certificats",
    },
    profile: "/admin/profile",
    parametres: "/admin/parametres",
  },

  // Stagiaire routes
  stagiaire: {
    login: "/stagiaire/login",
    dashboard: "/stagiaire/dashboard",
    formations: {
      view: (id: string | number) => `/stagiaire/formations/${id}`,
    },
    evaluations: {
      submit: (id: string | number) => `/stagiaire/evaluations/${id}`,
    },
    certificats: {
      view: (id: string | number) => `/stagiaire/certificats/${id}`,
    },
  },
}
