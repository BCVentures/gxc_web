import makeRouter from 'koa-router';
import Subscribe from '../model/Subscribe';

const router = makeRouter();

router.get('/', async (ctx, next) => {
  await next();
});

router.post('/subscribe', async (ctx, next) => {
  console.log('subscribe...')
  try {
    const email = ctx.request.body.email;
    let subscribe = await Subscribe.findOne({ email });
    if (!subscribe) {
      subscribe = new Subscribe({ email });
      await subscribe.save();
    }
    ctx.body = { subscribe };
  } catch (error) {
    console.log(error);
    await next();
  }
  await next();
});



export default router;
