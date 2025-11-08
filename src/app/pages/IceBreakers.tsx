
import { RequestInfo } from "rwsdk/worker";
import { Button } from '@/app/components/ui/button';
import { useState } from "react";
import { AddIceBreaker } from "@/app/components/AddIceBreaker";
import { getIceBreakers } from "@/app/components/functions";
import { IceBreakerCard } from "@/app/components/IceBreakerCard";
import {link} from "@/app/shared/links"
import { IceBreakerHeader } from "@/app/components/iceBreakerHeader";


const IceBreakers = async ({ ctx }: RequestInfo) => {

    let iceBreakers = await getIceBreakers();
    let loggedIn = false;
    console.log(iceBreakers);
    let userId = '';
    
    if (ctx.user){
        console.log('user is logged in')
        userId = ctx.user.id
        loggedIn = true;
    }
    

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <IceBreakerHeader loggedIn={loggedIn}/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex flex-col items-center gap-4">
          {iceBreakers.data.map((item) => (
            <IceBreakerCard
              key={item.id}
              iceBreakerId={item.id}
              iceBreaker={item.iceBreaker}
              authorName={item.author.username}
              authorId={item.authorId}
              currentUserId={userId}
            />
          ))}
        </div>
      </main>

      {/* Add Question Button (only when logged in) */}
      {loggedIn && <AddIceBreaker/>}
    </div>
  );
}

export {IceBreakers}
