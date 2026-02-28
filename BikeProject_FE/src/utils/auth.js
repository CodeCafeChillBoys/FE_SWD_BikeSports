// ==========================
// AUTH CONSTANTS
// ==========================

const ROLE_MAP = {
    1: "Admin",
    2: "Seller",
    3: "Buyer",
    4: "Inspector"
}

const ROLE_ROUTE_MAP = {
    Admin: "/admin",
    Seller: "/seller",
    Buyer: "/buyer",
    Inspector: "/inspector"
}

const ACCESS_TOKEN_KEY = "accessToken"
const ROLE_KEY = "role"

// ==========================
// LOGOUT
// ==========================

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    window.location.replace("/login")
}

// ==========================
// TOKEN
// ==========================

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// ==========================
// ROLE ID
// ==========================

export const getRoleId = () => {
    const role = localStorage.getItem(ROLE_KEY)
    return role ? Number(role) : null
}

// ==========================
// ROLE NAME
// ==========================

export const getRoleName = () => {
    const roleId = getRoleId()
    return ROLE_MAP[roleId] || null
}

// ==========================
// CHECK LOGIN
// ==========================

export const isAuthenticated = () => {
    return Boolean(getToken())
}

// ==========================
// GET ROUTE BY ROLE
// ==========================

export const getRoleRoute = (roleIdParam) => {
    const roleId = roleIdParam ?? getRoleId()
    const roleName = ROLE_MAP[roleId]
    return ROLE_ROUTE_MAP[roleName] || "/login"
}