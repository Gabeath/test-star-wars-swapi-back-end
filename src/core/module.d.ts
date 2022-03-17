declare namespace Express {
  interface Request {
    session: import('@models/session').ISession,
  }
}
