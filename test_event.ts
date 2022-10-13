import { handler } from "./index";
import { handleException } from "./util/handleException";

async function runTestEvent() {
  const handlerResponse = handler({});
  const [data, error] = await handleException(handlerResponse);
  if (data) {
    console.info(data);
  } else console.error(error);
}

runTestEvent();
