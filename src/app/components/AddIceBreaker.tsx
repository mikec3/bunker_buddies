'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";
import {onAddIceBreaker} from '@/app/components/functions';


const AddIceBreaker = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onAddIceBreaker(question);
      setQuestion("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full w-14 h-14 fixed bottom-6 right-6 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Ice Breaker Question</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your ice breaker question..."
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Question
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export {AddIceBreaker}