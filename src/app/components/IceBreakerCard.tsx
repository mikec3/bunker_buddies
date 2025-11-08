import { Card, CardContent } from "@/app/components/ui/card";

interface IceBreakerCardProps {
  iceBreaker: string;
  authorName: string;
}

export function IceBreakerCard({ iceBreaker, authorName }: IceBreakerCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <p className="mb-3">{iceBreaker}</p>
        <p className="text-muted-foreground">— {authorName}</p>
      </CardContent>
    </Card>
  );
}