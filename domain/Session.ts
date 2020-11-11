export const sessionHandler = (req: any, res: any, next: () => void) => {
  const sessioninfo = req.session.userSettings || {
    orderBy: "default",
    orderDescending: false,
    hideDone: false,
    theme: false,
  };
  const { orderBy, orderDescending, hideDone, theme } = req.query;

  if (orderBy) {
    sessioninfo.orderBy = orderBy;
  }
  if (orderDescending) {
    sessioninfo.orderDescending = orderDescending;
  }
  if (hideDone) {
    sessioninfo.hideDone = hideDone;
  }
  if (theme) {
    sessioninfo.theme = theme;
  }
  req.userSettings = req.session.userSettings = sessioninfo;

  next();
};
