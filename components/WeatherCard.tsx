
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

export function WeatherCard({input, output}: {input: any, output: any}) {
  return (
    <Card className="w-full text-center max-w-sm">
      <CardHeader>
        <CardTitle>{output?.weather.main}</CardTitle>
        <CardDescription>
          {output?.weather.description}
        </CardDescription>
       
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center">
        <Image src={`https://openweathermap.org/img/wn/${output?.weather.icon}.png`} width={64} height={64} alt="" />
        <p>{((output?.temp) - 273).toFixed(2)} °C</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p>{input?.location}</p>
      </CardFooter>
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