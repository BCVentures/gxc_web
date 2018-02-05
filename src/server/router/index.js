import makeRouter from 'koa-router';

const router = makeRouter();

router.get('/*', async(ctx, next) => {
  await next();
});

export default router;
