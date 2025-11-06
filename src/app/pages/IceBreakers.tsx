
import { RequestInfo } from "rwsdk/worker";
import { Button } from '@/app/components/ui/button';
import { useState } from "react";
import { AddIceBreaker } from "@/app/components/AddIceBreaker";
import { getIceBreakers } from "@/app/components/functions";


const IceBreakers = async ({ ctx }: RequestInfo) => {

    let iceBreakers = await getIceBreakers();
    console.log(iceBreakers);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1>Ice Breaker Questions</h1>
          <Button
            variant="outline"
            size="sm"
            
          >
            {ctx.user ? "Log Out" : "Log In"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex flex-col items-center gap-4">

        </div>
      </main>

      {/* Add Question Button (only when logged in) */}
      {ctx.user && <AddIceBreaker/>}
    </div>
  );
}

export {IceBreakers}
