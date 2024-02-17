import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ModeToggle } from "./components/ui/mode-toggle"
import { CheckboxWithText } from "./components/checkbox-custom"

function App() {

  return (
    <div className='w-dvw h-dvh flex justify-center items-center gap-4'>
      <ThemeProvider>
        <ModeToggle></ModeToggle>
      </ThemeProvider>
      <Card className="w-60">
        <CardHeader>
          <CardTitle>Light Mode Card</CardTitle>
          <CardDescription>Checking Buttons</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="flex justify-center items-center gap-4 flex-col">
            <Button variant="default">Get Started</Button>
            <Button variant="secondary">Get Started</Button>
            <Button variant="destructive">Get Started</Button>
            <Button variant="outline">Get Started</Button>
          </p>
        </CardContent>
      </Card>
    <CheckboxWithText></CheckboxWithText>
    </div>
  )
}

export default App
