import { Loader2 } from "lucide-react";


export default function Loader() {
    return (<div className="flex items-center w-full h-full justify-center">
        <Loader2 className="animate-spin" />
    </div>)
}