"use server";

import { RequestInfo } from "rwsdk/worker";
import { Feed } from "@/app/components/Feed";
import { db } from "@/db";
import { Button } from "@/app/components/ui/button";
import {Card, CardTitle, CardDescription, CardHeader, CardContent} from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label";
import {Input} from "@/app/components/ui/input";
import {link} from "@/app/shared/links"
import {AnswerInput} from "@/app/components/AnswerInput"
import { useState } from "react";

const Today = async () => {

     // placeholder question text will get overwritten by db response
      //let questionText = "Get in loser we're riding out the apocolypse";
      //let questionId = ""; // will get set in query

      let questionText = "Get in loser we're riding out the apocolypse";
      let questionId = "";
    
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time
    
      startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)
    
      // get today's question
     const question = await db.question.findUnique({
      where:{
        dateKey: startOfToday
      }
     });
    
     // if today's question text was found, replace the placeholder
      if (question?.question != null) {
        questionText = question.question;
        questionId = question.id;
      }

  return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <Card className="w-full max-w-md mx-auto sm:max-w-lg">
        <CardHeader className="space-y-2 text-center pt-8 pb-6">
          <CardTitle className="text-3xl sm:text-4xl">Bunker Buddies</CardTitle>
          <CardDescription className="text-base">
            Answer before entering!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 px-6 pb-8">
          <div className="space-y-8">
            {/* Prominent witty question */}
            <div className="text-center py-8">
              <p className="text-9xl sm:text-3xl font-bold text-foreground leading-relaxed">
                {questionText}
              </p>
            </div>
            <AnswerInput questionId={questionId}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export {Today}