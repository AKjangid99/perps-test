import "dotenv/config";
import { createClient } from "redis";
import { env } from "./utils/env";
import type { EngineRequest, EngineResponse } from "./types/engineRequest";
import { createOrderHandler } from "./engineProcess/createOrder";
import type { cancelOrder, CreateOrder } from "./types/type";
import { cancelOrderHandler } from "./engineProcess/cancelOrder";
import { getUserBalanceHandler } from "./engineProcess/userbalance";
import { DepthHandler } from "./engineProcess/Depth";



const responseClient = createClient({ url: env.redisUrl }).on("error", (error) => {
  console.error("Redis broker client error", error);
});

const subscriberClient = createClient({ url: "redis://localhost:6379" }).on("error", (error) => {
  console.error("Redis broker client error", error);
});;


await Promise.all([subscriberClient.connect(), responseClient.connect()]);

async function sendResponse(responseQueue: string, response: EngineResponse): Promise<void> {
  await responseClient.lPush(responseQueue, JSON.stringify(response));
}

function handleEngineRequest(message: EngineRequest): unknown {
  switch (message.type) {
    case "createOrder":
      let createOrderpayload = message.payload as CreateOrder
      createOrderHandler(createOrderpayload)

      break;

    case "cancelOrder":
      let cancelOrderpayload = message.payload as cancelOrder
      cancelOrderHandler(cancelOrderpayload)
      break;


    case "getUserBalance":
      getUserBalanceHandler(message.payload.userId as string)
      break;


    case "getDepth":
      DepthHandler()
      break


    case "addBalance":

      break
  }

  return
}


export const listenFortheResponse = async () => {
  for (; ;) {
    const item = await subscriberClient.BRPOP(env.incomingQueue, 0);
    if (!item) continue;

    let message: EngineRequest;

    try {
      message = JSON.parse(item.element) as EngineRequest;
    } catch {
      console.error("Skipping invalid broker message");
      continue;
    }

    try {
      let data = handleEngineRequest(message)
      await sendResponse(message.responseQueue, {
        correlationId: message.correlationId,
        ok: true,
        data,
      });
    }
    catch {
      await sendResponse(message.responseQueue, {
        correlationId: message.correlationId,
        ok: false,
        error: "engine_error",
      });
    }
  }

}