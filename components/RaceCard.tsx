
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card"
  import Image from "next/image"
  
  
  
  export function RaceCard({ output }: {output: any}) {
    return (
      <Card className="w-full text-center max-w-sm">
        <CardHeader>
          <CardTitle>{output?.race.raceName}</CardTitle>
          <CardDescription className="flex flex-col">
            <p>{new Date(output?.race.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{new Date(output?.race.date+'T'+output?.race.time).toLocaleTimeString()}</p>
          </CardDescription>
         
        </CardHeader>
        <CardContent className="flex flex-col gap-2 items-center">
            {output?.race.Circuit?.circuitName}
        </CardContent>
      </Card>
    )
  }
  
  
  // {
  //   "weather": {
  //     "id": 800,
  //     "main": "Clear",
  //     "description": "clear sky",
  //     "icon": "01n"
  //   },
  //   "temp": 269.81
  // }