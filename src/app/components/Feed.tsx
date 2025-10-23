"use client"
import { db } from "@/db";
import { RequestInfo } from "rwsdk/worker";
import {getConnectionsAndAnswers, getQuestions, getQuestionsAndAnswers } from "@/app/components/functions";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { questionsAndAnswersInterface, submitAnswer } from "@/app/components/functions";
import { userInterface } from "./Header";
import { Input } from "./ui/input";
import { Send } from "lucide-react";


const Feed = ({questionsAndAnswers, user}:
   {questionsAndAnswers: questionsAndAnswersInterface
    , user: userInterface
   }) => {

    const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});

// TODO - useState the questionsAndAnswers so that you can map through it
//console.log(questionsAndAnswers);

  const formatDate = (dateKey: string) => {
    const date = new Date(dateKey);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const qDateRaw = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                date.getUTCDate(), date.getUTCHours(),
                date.getUTCMinutes(), date.getUTCSeconds());
    
    const offset = today.getTimezoneOffset() * 60 * 1000;
    const qDate = new Date(qDateRaw + offset);

    console.log(qDate);



    // console.log(qDate);

    // console.log(qDateRaw);
    //  console.log('datekey: ' + qDate.toDateString());
    //  console.log('today: ' + today.toString());
    // console.log(date.toUTCString())
    // console.log(qDate.toDateString());
    if (qDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (qDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const diffTime = Math.abs(today.getTime() - qDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
  };

  const formatTimestamp = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleAnswerChange = (e: React.KeyboardEvent, questionId: string, value: string) => {
    e.preventDefault();
    setAnswerInputs(prev => ({
      ...prev,
      [questionId]: value
    }));
  }

  // handle when user answers a question
    const handleSubmitAnswer = (questionId: string) => {
    const answerText = answerInputs[questionId]?.trim();
    if (!answerText || !user) return;

    console.log('quetionId: ' + questionId)
    console.log('answerText: ' + answerText)

    submitAnswer(answerText, questionId);
  };

  const hasUserAnswered = (questionId: string) => {
    let answeredFlag = false;
    let getQuestion = questionsAndAnswers.filter(question => question.id === questionId);
    let getAnswer = getQuestion[0].answers?.filter(answer => answer.userId === user.id);
    console.log(getQuestion);
    console.log(getAnswer);
    if (getAnswer.length > 0) {
      answeredFlag = true;
    }

    return answeredFlag;

  }

  return (
  <div className="min-h-screen bg-background">
      {/* Feed */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {questionsAndAnswers.map((question) => (
          <Card key={question.id} className="w-full border-2">
            <CardHeader className="pb-6 bg-gradient-to-r from-accent/50 to-secondary/30">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-xs font-medium">
                  {formatDate(question.dateKey)}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Daily Question
                </Badge>
              </div>
              <CardTitle className="text-2xl sm:text-3xl leading-tight font-bold text-center py-6">
                {question.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-6">
              {question.answers.length > 0 ? (
                hasUserAnswered(question.id) ? 
                  (<div className="text-center py-8 text-muted-foreground">
                    <p className="text-lg font-medium text-lime-600"> ** Answer to see what others have said! **</p>
                  </div>)
                :
                question.answers.map((answer) => (
                  <div key={answer.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10 mt-1">
                        <AvatarFallback className="text-sm font-medium">
                          {answer.user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-base">
                            {answer.user.username}
                            {answer.user.username === 'localhostUser' && (
                              <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(answer.createdAt)}
                          </span>
                        </div>
                        
                        <p className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
                        {answer.answerText}
                        </p>
                        
                        <div className="flex items-center space-x-6 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 px-3 text-sm"
                            onClick={() => handleLike(question.id, answer.id)}
                          >
                            <Heart 
                              className={`w-4 h-4 mr-2 ${
                                answer.isLiked ? 'fill-red-500 text-red-500' : ''
                              }`}
                            />
                            {answer.likes || 0}
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="h-9 px-3 text-sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="h-9 px-3 text-sm">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-base">No bunker buddies have answered yet!</p>
                </div>
              )}
              
              {/* Add your answer section */}
              <div className="pt-6 border-t-2 border-border/50">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-sm font-medium">
                      {user ? user.username.charAt(0).toUpperCase() : 'Y'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex space-x-2">
                    <Input
                      value={answerInputs[question.id] || ''}
                      onChange={(e) => handleAnswerChange(e, question.id, e.target.value)}
                      placeholder="💭 Share your survival wisdom..."
                      className="flex-1 h-12 border-2 border-dashed focus:border-solid"
                    />
                    <Button
                      onClick={() => handleSubmitAnswer(question.id)}
                      disabled={!answerInputs[question.id]?.trim()}
                      size="icon"
                      className="h-12 w-12 shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Load more placeholder */ /*
        <div className="text-center py-8">
          <Button variant="outline" className="text-sm">
            Load more survival discussions 📜
          </Button>
        </div>
        */}
      </div>
    </div>
  )
}

export { Feed }


    // <div>
    //   <p> yoooo</p>
    //   {questionsAndAnswers.map((question)=> (
    //     <p>{question.id}</p>
    //   ))}
    //   <pre>{JSON.stringify({questionsAndAnswers}, null, 2)}</pre>
    // </div>




    //    <div className="min-h-screen bg-background">
    //   {/* Header */}
    //   <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
    //     <div className="max-w-2xl mx-auto px-4 py-4">
    //       <div className="flex items-center justify-between">
    //         <h1 className="text-xl font-bold">Bunker Buddies</h1>
    //         <Badge variant="secondary" className="text-xs">
    //           Day 127 of survival 🏃‍♀️
    //         </Badge>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Feed */}
    //   <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
    //     {questionsAndAnswers.map((question) => (
    //       <Card key={question.id} className="w-full border-2">
    //         <CardHeader className="pb-6 bg-gradient-to-r from-accent/50 to-secondary/30">
    //           <div className="flex items-center justify-between mb-4">
    //             <Badge variant="outline" className="text-xs font-medium">
    //               {formatDate(question.dateKey)}
    //             </Badge>
    //             <Badge variant="secondary" className="text-xs">
    //               Daily Question
    //             </Badge>
    //           </div>
    //           <CardTitle className="text-2xl sm:text-3xl leading-tight font-bold text-center py-6">
    //             {question.question}
    //           </CardTitle>
    //         </CardHeader>
            
    //         <CardContent className="space-y-6 pt-6">
    //           {question.answers.length > 0 ? (
    //             question.answers.map((answer) => (
    //               <div key={answer.id} className="space-y-3">
    //                 <div className="flex items-start space-x-3">
    //                   <Avatar className="w-10 h-10 mt-1">
    //                     <AvatarFallback className="text-sm font-medium">
    //                       {answer.user.username.charAt(0).toUpperCase()}
    //                     </AvatarFallback>
    //                   </Avatar>
                      
    //                   <div className="flex-1 space-y-3">
    //                     <div className="flex items-center space-x-2">
    //                       <span className="font-medium text-base">
    //                         {answer.user.username}
    //                         {answer.user.username === 'localhostUser' && (
    //                           <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
    //                         )}
    //                       </span>
    //                       <span className="text-xs text-muted-foreground">
    //                         {formatTimestamp(answer.createdAt)}
    //                       </span>
    //                     </div>
                        
    //                     <p className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
    //                       {answer.answerText}
    //                     </p>
                        
    //                     <div className="flex items-center space-x-6 pt-2">
    //                       <Button
    //                         variant="ghost"
    //                         size="sm"
    //                         className="h-9 px-3 text-sm"
    //                         onClick={() => handleLike(question.id, answer.id)}
    //                       >
    //                         <Heart 
    //                           className={`w-4 h-4 mr-2 ${
    //                             answer.isLiked ? 'fill-red-500 text-red-500' : ''
    //                           }`}
    //                         />
    //                         {answer.likes || 0}
    //                       </Button>
                          
    //                       <Button variant="ghost" size="sm" className="h-9 px-3 text-sm">
    //                         <MessageCircle className="w-4 h-4 mr-2" />
    //                         Reply
    //                       </Button>
                          
    //                       <Button variant="ghost" size="sm" className="h-9 px-3 text-sm">
    //                         <Share className="w-4 h-4" />
    //                       </Button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <div className="text-center py-8 text-muted-foreground">
    //               <p className="text-base">No bunker buddies have answered yet!</p>
    //               <p className="text-sm mt-2">Be the first to share your survival wisdom 🧠</p>
    //             </div>
    //           )}
              
    //           {/* Add your answer section */}
    //           <div className="pt-6 border-t-2 border-border/50">
    //             <div className="flex items-start space-x-3">
    //               <Avatar className="w-10 h-10">
    //                 <AvatarFallback className="text-sm font-medium">Y</AvatarFallback>
    //               </Avatar>
    //               <div className="flex-1">
    //                 <Button variant="outline" className="h-12 w-full justify-start text-base text-muted-foreground border-2 border-dashed hover:border-solid hover:bg-accent/50">
    //                   💭 Share your survival wisdom...
    //                 </Button>
    //               </div>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}
        
    //     {/* Load more placeholder */}
    //     <div className="text-center py-8">
    //       <Button variant="outline" className="text-sm">
    //         Load more survival discussions 📜
    //       </Button>
    //     </div>
    //   </div>
    // </div>