export const successResponse = (
  res: any,
  statusCode: number,
  data: any,
  message = "Success",
) => {
  return res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (
  res: any,
  statusCode: number,
  message: string,
  errorDetails: any = null,
) => {
  return res.status(statusCode).json({ success: false, message, errorDetails });
};
