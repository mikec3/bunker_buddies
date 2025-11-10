import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Send } from "lucide-react";

export interface Comment {
  commentId: string;
  commentText: string;
  author: User;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  isLoggedIn: boolean;
}

export function CommentSection({ comments, onAddComment, isLoggedIn }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="mt-4">
      <Separator className="mb-4" />
      
      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3 mb-4">
          {comments.map((comment) => (
            <div key={comment.commentId} className="space-y-1">
              <p className="text-muted-foreground">{comment.commentText}</p>
              <p className="text-muted-foreground opacity-70">
                — {comment.author.username}
              </p>
              
            </div>
          ))}
        </div>
      )}

      {/* Comment Input */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!commentText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      ): (
        <div className="flex justify-end">
        <p className="text-muted-foreground opacity-70"> log in to comment</p>
        </div>
      )}
    </div>
  );
}
