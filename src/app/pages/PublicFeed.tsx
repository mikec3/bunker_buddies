import { RequestInfo } from "rwsdk/worker";
import { Feed } from "@/app/components/Feed";
import {getPublicQuestions, publicQuestionsInterface} from "@/app/components/functions";
import {Header} from "@/app/components/Header";
import { Button } from '@/app/components/ui/button';
import { LogIn } from 'lucide-react';
import { link } from "@/app/shared/links";
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

const PublicFeed = async ({ ctx }: RequestInfo) => {

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today in local time

  startOfToday.setUTCHours(0,0,0); // set to UTC 00 hours because (other time zones like PST will add 7hours)
  const todayMinusXDays = new Date(startOfToday);
  todayMinusXDays.setDate(todayMinusXDays.getDate()-10);

  let publicQuestions = await getPublicQuestions( todayMinusXDays, startOfToday);

  console.log(publicQuestions.data);
  console.log('logged in as: ' + ctx.user?.username);
  //console.log('inbound Conn Requests' + JSON.stringify(inboundConnReq.data[0].requester.username));

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

    if (qDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (qDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const diffTime = Math.abs(today.getTime() - qDate.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      diffDays--;
      return `${diffDays} days ago`;
    }
  };

  return (
    <div>
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Bunker Buddies</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <a href="/user/login">
            <Button 
              variant={"default"} 
              size="sm"
            
              className="h-9 px-3 text-sm"
            >
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Enter Bunker
                </>
            </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
    {publicQuestions.data?.map((question) => (
            <Card key={question.id} className="w-full border-2 mb-2">
            <CardHeader className="pb-6 bg-gradient-to-r from-accent/50 to-secondary/30">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-xs font-medium">
                  {formatDate(question.dateKey)}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                 Join to answer with buddies
                </Badge>
              </div>
              <CardTitle className="text-2xl sm:text-3xl leading-tight font-bold text-center py-6">
                {question.question}
              </CardTitle>
            </CardHeader>
            </Card>
    ))}
  </div>);
}

export {PublicFeed}
