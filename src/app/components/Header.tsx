"use client"
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UserPlus, LogOut, LogIn } from 'lucide-react';
import { link } from '../shared/links';
import { AddBuddy } from './AddBuddy';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { inboundConnReqInterface } from './functions';
import { json } from 'stream/consumers';
//import { useUser } from './UserContext';

const Header = ({inboundConnReq}: {inboundConnReq: inboundConnReqInterface}) =>{

    console.log(inboundConnReq);

    const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);
  //const { user, logout } = useUser();
  const user = "";

  const handleAddFriend = () => {
    // Mock add friend functionality
    console.log('Add friend clicked');
    // In a real app, this would open a modal or navigate to add friend page
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.location.href = link("/user/logout");
  }

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Bunker Buddies</h1>
          </div>
          
          <div className="flex items-center space-x-2">

            <Sheet open={isContactSheetOpen} onOpenChange={setIsContactSheetOpen}>
                <SheetTrigger className="flex items-center gap-2 font-poppins text-sm font-bold py-3 px-6 rounded-md cursor-pointer">
                    <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 px-3 text-sm"
                >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Buddy
                </Button>
                </SheetTrigger>
            <SheetContent className="pt-[100px] px-12">
            <SheetHeader>
                <SheetTitle>Add a Buddy</SheetTitle>
                <SheetDescription>
                Send a request to become Bunker Buddies!
                </SheetDescription>
                <AddBuddy callback={() => setIsContactSheetOpen(false)}/>
            </SheetHeader>
            </SheetContent>
        </Sheet>
            
            <Button 
              variant={user ? "outline" : "default"} 
              size="sm"
              className="h-9 px-3 text-sm"
              onClick={handleLogout}
            >
              {true ? (
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
      <p>{JSON.stringify(inboundConnReq)}</p>
    </div>
  );
}

export {Header}