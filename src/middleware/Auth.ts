import { Response, NextFunction } from 'express';
import { IRequest } from '../types/custom';
import httpCodes from 'http-status-codes';
import Utils from '../utils/utils';

export const authUser = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const errMessage = 'No auth token';
    return Utils.errorResponse(res, errMessage, httpCodes.UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');

  // Verify token
  try {
    const decoded = Utils.verifyToken(token);

    req.user = decoded.user;
    next();
  } catch (err) {
    const errMessage = 'Invalid token. Please login';
    return Utils.errorResponse(res, errMessage, httpCodes.UNAUTHORIZED);
  }
};

export const authAdmin = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== 'admin') {
      const errMessage = 'Unauthorized action';
      return Utils.errorResponse(res, errMessage, httpCodes.FORBIDDEN);
    }
    next();
  } catch (err) {
    const errMessage = 'Error validating account';
    return Utils.errorResponse(res, errMessage, httpCodes.UNAUTHORIZED);
  }
};
