
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
  
  
  
  export function StockCard({ output }: {output: any}) {
    if(!output?.stock){
        return <p>Loading...</p>
      }
    return (
      <Card className="w-full text-center min-w-[200px] ">
        <CardHeader>
          <CardTitle>{output?.stock}</CardTitle>
          <CardDescription className="flex flex-col">
            <p>{output?.price}</p>
          </CardDescription>
         
        </CardHeader>
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