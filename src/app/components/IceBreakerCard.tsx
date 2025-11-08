'use client'
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {deleteIceBreaker} from '@/app/components/functions';

interface IceBreakerCardProps {
  iceBreakerId: string;
  iceBreaker: string;
  authorName: string;
  authorId: string;
  currentUserId: string
}

export function IceBreakerCard({ iceBreakerId, iceBreaker, authorName, authorId, currentUserId }: IceBreakerCardProps) {
    let userIsAuthor = false;
    if (authorId == currentUserId) {
        userIsAuthor = true;
    }

    const deleteQuestion = () => {
        console.log('delete ' + iceBreakerId)
        deleteIceBreaker(iceBreakerId);
    }
  
    return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <p className="mb-3">{iceBreaker}</p>
        <p className="text-muted-foreground">— {authorName}</p>
        {userIsAuthor && (
            <div className="w-full flex justify-end">
                <Button
                    onClick={deleteQuestion}
                >
                    X
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}