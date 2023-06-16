'use client';

import Settings from "@/components/Settings";
import Webhooks from "@/components/Webhooks";
import { useState } from "react";

export default function Home() {
  const [webhooks, setWebhooks] = useState([]);
  const webhookHandler = function(data: []){
    console.log(data);
    setWebhooks(data);
  }
  return (
    <main className="p-20">
      <div className="flex flex-col">
        <Settings webhookHandler={webhookHandler}/>
        <Webhooks hooksData={webhooks} />
      </div>
    </main>
  )
}
