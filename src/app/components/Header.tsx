"use client"
import { RequestInfo } from "rwsdk/worker";
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UserPlus, LogOut, LogIn } from 'lucide-react';
import { link } from '../shared/links';
import { AddBuddy } from '@/app/components/AddBuddy';
import { AddBuddySheet } from "@/app/components/AddBuddySheet";
import { toast } from "sonner"
import { Toaster } from "@/app/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { inboundConnReqInterface, outboundConnReqInterface
    , sendConnReq, cancelOutboundConnReq, cancelInboundConnReq
    , getAllConn, allConnInterface, acceptConnReq } from '@/app/components/functions';
import { json } from 'stream/consumers';
import { Prisma } from "@prisma/client";
//import { useUser } from './UserContext';

// interface for getQuestionsAndAnswers
export type userInterface = Prisma.UserGetPayload<{
}>

const Header = ({inboundConnReq
                , outboundConnReq
                , user
                , allConn
}: {inboundConnReq: inboundConnReqInterface
    , outboundConnReq: outboundConnReqInterface
    , user: userInterface
    , allConn: allConnInterface
}) =>{

    //console.log(inboundConnReq);



    const [isAddBuddyOpen, setIsAddBuddyOpen] = useState(false);
  //const { user, logout } = useUser();
  console.log(user);
  console.log(allConn);

  const handleAddBuddy = () => {
    // Mock add friend functionality
    setIsAddBuddyOpen(true);
    console.log('Add friend clicked');
    // In a real app, this would open a modal or navigate to add friend page
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.location.href = link("/user/logout");
  }

  const handleAcceptRequest = async (requesterId: string) => {
    //setConnectionRequests(prev => prev.filter(req => req.requesterId !== requesterId));
    // In a real app, this would make an API call to accept the request
    console.log('Accepted request from:', requesterId);
    let result = await acceptConnReq(requesterId);
    console.log(result);
  };

    const handleRejectRequest = async (requesterId: string) => {
    //setConnectionRequests(prev => prev.filter(req => req.requesterId !== requesterId));
    // In a real app, this would make an API call to reject the request
    console.log('Rejected request from:', requesterId);
    let result = await cancelInboundConnReq(requesterId);
    console.log(result);
  };

    const handleSendRequest = async (username: string) => {
    console.log('Sending request to:', username);
    const result = await sendConnReq(username); //{success: true}//await createContact(formData);
    if (result.success) {
    //toast.success("Request Sent! (header)")
    console.log('send success toast');
    } else {
    toast.error("Error with request (header)")
    }
  };

    const handleCancelOutboundRequest = async (requestedId: string) => {
    //setOutboundRequests(prev => prev.filter(req => req.id !== requestId));
    // In a real app, this would make an API call to cancel the request
    console.log('Cancelled request:', requestedId);
    let result = await cancelOutboundConnReq(requestedId);
    console.log(result);
  };


    return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Bunker Buddies</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {user && (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddBuddy}
                  className="h-9 px-3 text-sm"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Buddy
                </Button>
                {inboundConnReq.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {inboundConnReq.length}
                  </Badge>
                )}
              </div>
            )}
            
            <Button 
              variant={user ? "outline" : "default"} 
              size="sm"
              onClick={handleLogout}
              className="h-9 px-3 text-sm"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Exit Bunker
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Enter Bunker
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <AddBuddySheet
        isOpen={isAddBuddyOpen}
        onOpenChange={setIsAddBuddyOpen}
        connectionRequests={inboundConnReq}
        outboundRequests={outboundConnReq}
        onAcceptRequest={handleAcceptRequest}
        onRejectRequest={handleRejectRequest}
        onSendRequest={handleSendRequest}
        onCancelOutboundRequest={handleCancelOutboundRequest}
        allConn={allConn}
      />
    </div>
  );
}

export {Header}

    //   <AddBuddySheet
    //     isOpen={isAddBuddyOpen}
    //     onOpenChange={setIsAddBuddyOpen}
    //     connectionRequests={inboundConnReq}
    //     onAcceptRequest={handleAcceptRequest}
    //     onRejectRequest={handleRejectRequest}
    //     onSendRequest={handleSendRequest}
    //   />