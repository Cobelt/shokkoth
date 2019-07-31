export function adminAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => ({ source, args, context, info }) => {
      console.log('=>', context.cookies);
      if (!context.cookies.shokkothJWT) {
        throw new Error('You should be admin, to have access to this action.');
      }
      return next(resolveParams);
    });
  });
  return resolvers;
}
