"use client"
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UserPlus, LogOut, LogIn } from 'lucide-react';
import { link } from '../shared/links';
//import { useUser } from './UserContext';

export function Header() {
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
            {true && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 px-3 text-sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Buddy
              </Button>
            )}
            
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
    </div>
  );
}