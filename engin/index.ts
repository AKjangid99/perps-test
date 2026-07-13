import "dotenv/config";
import { createClient } from "redis";
import { env } from "./utils/env";
import type { EngineRequest, EngineResponse } from "./types/types";



const responseClient = createClient({url : env.redisUrl}).on("error", (error) => {
  console.error("Redis broker client error", error);
}); 

const subscriberClient = createClient({url: "redis://localhost:6379"}).on("error", (error) => {
    console.error("Redis broker client error", error);
}); ;


await Promise.all([subscriberClient.connect(), responseClient.connect()]);

async function sendResponse(responseQueue: string, response: EngineResponse): Promise<void> {
  await responseClient.lPush(responseQueue, JSON.stringify(response));
}

function handleEngineRequest(message: EngineRequest): unknown {

    switch ( message.type ) {
        case "create_order" : 

        break;

        case "cancel_order": 

        break;
        

        case "get_order" : 
        break; 


        case "get_user_balance" : 

        break; 


        case "get_depth" : 

        break
    }   

    return 
}

export const listenFortheResponse  =  async () => { 

    for(;;){
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
    let data = handleEngineRequest( message )
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