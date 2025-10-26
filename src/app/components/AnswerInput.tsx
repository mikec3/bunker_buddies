"use client";

import { useState, useTransition } from "react";
import { Button } from "@/app/components/ui/button";
import {Card, CardTitle, CardDescription, CardHeader, CardContent} from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label";
import {link} from "@/app/shared/links"
import { Textarea } from "./ui/textarea";
import { submitAnswer } from "@/app/components/functions";

export function AnswerInput({questionId}:{questionId:string}) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('answer attempt:', { answer });
    // Here you would handle the answer submission
    const response = await submitAnswer(answer, questionId);
    //console.log(response);
    if (response.success == true){
        // answer submitted successfully, handle next steps here.
        window.location.href = link("/feed");

    } else {
        console.log('handle error in answer submission!!!');
    }
  }

    return (
          <form>
            <div className="space-y-3 mb-6">
              <Label htmlFor="answer" className="text-base">My thoughts</Label>
              <Textarea
                id="answer"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className="w-full h-24 text-base"
              />
            </div>

            <Button className="w-full h-12 text-base"
            onClick={handleSubmit} disabled={isPending}>
             {isPending ? <>...</> : "Enter the Bunker"}
            </Button>
          </form>
  );
}