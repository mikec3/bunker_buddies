'use client'
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {deleteIceBreaker, upVoteIceBreaker, downVoteIceBreaker} from '@/app/components/functions';
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface IceBreakerCardProps {
  iceBreakerId: string;
  iceBreaker: string;
  authorName: string;
  authorId: string;
  currentUserId: string;
  upVotes: number;
  downVotes: number;
  netVotes: number;
}

export function IceBreakerCard({ iceBreakerId, iceBreaker, authorName, authorId, currentUserId, upVotes, downVotes, netVotes }: IceBreakerCardProps) {
    let userIsAuthor = false;
    if (authorId == currentUserId) {
        userIsAuthor = true;
    }

    const deleteQuestion = () => {
        console.log('delete ' + iceBreakerId)
        deleteIceBreaker(iceBreakerId);
    }

    const onUpVote = () => {
        if (currentUserId) {
        upVoteIceBreaker(iceBreakerId)
        } else {
            alert('must be logged in to vote');
        }
    }

    const onDownVote = () => {
        if (currentUserId) {
        downVoteIceBreaker(iceBreakerId)
        } else {
            alert('must be logged in to vote');
        }
    }
  
    return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <p className="mb-3">{iceBreaker}</p>
        <p className="text-muted-foreground mb-4">— {authorName}</p>
                {/* Voting Section */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onUpVote}
              className="gap-1"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{upVotes}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onDownVote}
              className="gap-1"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{downVotes}</span>
            </Button>
          </div>
          
          <Badge variant={netVotes > 0 ? "default" : netVotes < 0 ? "destructive" : "secondary"}>
            Net: {netVotes > 0 ? `+${netVotes}` : netVotes}
          </Badge>
        </div>
        {userIsAuthor && (
            <div className="w-full flex justify-end">
                <Button
                    onClick={deleteQuestion}
                >
                    delete
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}