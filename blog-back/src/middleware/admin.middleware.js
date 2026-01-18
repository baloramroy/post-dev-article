// Simple admin check (extend later if needed)
export const adminMiddleware = (req, res, next) => {
if (req.user.username !== 'admin') {
return res.status(403).json({ message: 'Admin only' });
}
next();
};