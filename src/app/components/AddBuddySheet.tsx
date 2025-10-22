import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { UserPlus, Check, X, Users, Zap, Clock } from 'lucide-react';
import { userInterface } from '@/app/components/Header';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';
import { outboundConnReqInterface, inboundConnReqInterface, allConnInterface } from '@/app/components/functions';
//import { useUser } from './UserContext'; -- figma fragment


interface AddBuddySheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  connectionRequests: inboundConnReqInterface;
  outboundRequests: outboundConnReqInterface;
  onAcceptRequest: (requesterId: string) => void;
  onRejectRequest: (requesterId: string) => void;
  onSendRequest: (username: string) => void;
  onCancelOutboundRequest: (requestId: string) => void;
  allConn: allConnInterface;
}

export function AddBuddySheet({
  isOpen,
  onOpenChange,
  connectionRequests,
  outboundRequests,
  onAcceptRequest,
  onRejectRequest,
  onSendRequest,
  onCancelOutboundRequest,
  allConn
}: AddBuddySheetProps) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const { user } = useUser();

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    onSendRequest(username.trim());
    setUsername('');
    setIsLoading(false);
    toast.success('friend request sent (addbuddysheet)!');
  };

  const formatTimeAgo = (createdAt: string) => {
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

  const showBuddies = () => {
    console.log('show buddies button pressed');
  }

  console.log(outboundRequests)

    return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <div className="p-6 pb-4">
          <SheetHeader className="space-y-3">
            <SheetTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Bunker Connections</span>
            </SheetTitle>
            <SheetDescription>
              Expand your survival crew and manage buddy requests
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Send Connection Request */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <h3 className="font-medium">Recruit New Buddy</h3>
            </div>
            
            <form onSubmit={handleSendRequest} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="buddy-username"
                  type="text"
                  placeholder="Enter their bunker alias..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!username.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Sending Signal...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Send Connection Request
                  </>
                )}
              </Button>
            </form>
          </div>

          <Separator className="my-6" />

          {/* Inbound Connection Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <h3 className="font-medium">Incoming Requests</h3>
              </div>
              {connectionRequests.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {connectionRequests.length} pending
                </Badge>
              )}
            </div>

            {connectionRequests.length > 0 ? (
              <div className="space-y-3">
                {connectionRequests.map((request) => (
                  <div 
                    key={request.requesterId} 
                    className="flex items-center justify-between p-3 border rounded-lg bg-card"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-9 h-4">
                        <AvatarFallback className="text-sm font-medium">
                          {request.requester.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {request.requester.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Wants to join your crew • {formatTimeAgo(request.requester.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onAcceptRequest(request.requesterId)}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRejectRequest(request.requesterId)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2 text-muted-foreground">
                <Users className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No pending requests</p>
                <p className="text-xs mt-1">Your bunker is secure for now 🛡️</p>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Outbound Connection Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <h3 className="font-medium">Sent Requests</h3>
              </div>
              {outboundRequests.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {outboundRequests.length} pending
                </Badge>
              )}
            </div>

            {outboundRequests.length > 0 ? (
              <div className="space-y-3">
                {outboundRequests.map((request) => (
                  <div 
                    key={request.requested.id} 
                    className="flex items-center justify-between p-3 border rounded-lg bg-card"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="text-sm font-medium">
                          {request.requested.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {request.requestedUsername}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Awaiting response • {formatTimeAgo(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCancelOutboundRequest(request.requestedId)}
                      className="h-8 px-3 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2 text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No pending requests</p>
                <p className="text-xs mt-1">Send some invitations! 📡</p>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Current Buddy Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Current crew size</span>
              <Badge variant="outline" className="text-xs"
                onClick={showBuddies}>
                {allConn.length} buddies 👥
              </Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}