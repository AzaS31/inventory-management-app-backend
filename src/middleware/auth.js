
export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Authentication required.' });
}

export function isAdmin(req, res, next) {
    if (req.user && req.user.role && req.user.role.name === 'ADMIN') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Requires Administrator role.' });
}