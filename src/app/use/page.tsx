"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/authStore"
import { useToast } from "@/hooks/use-toast"
import { AuthTokenManagerComponent } from "@/components/components-auth-token-manager"

export default function AuthPage() {
  const { toast } = useToast()
  const { isLoggedIn, email, password, login, logout } = useAuthStore();  // Assuming `logout` is also available in the store
  const [emailInput, setEmail] = useState("")
  const [passwordInput, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailInput || !passwordInput) {
      return toast({
        title: "Error",
        description: "Please enter your email and password.",
        variant: "destructive"
      })
    }

    toast({
      title: "Accessing Account...",
      description: "Please wait a moment.",
    })

    // Perform login, and wait for it to complete
    const success = await login(emailInput, passwordInput)

    // After login, check if `isLoggedIn` was updated to true
    if (success) {
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      })
    } else {
      toast({
        title: "Login Failed",
        description: "Unable to log in. Please check your credentials.",
        variant: "destructive"
      })
    }
  }

  const handleLogout =async  () => {
    toast({
        title: "Logging out of Account...",
        description: "Please wait a moment.",
      })
    const success = await logout(); // Clear auth state
    if (success) {
      toast({
        title: "Success",
        description: "You have successfully logged out.",
      })
    }
    else{
        toast({
            title: "Logout Failed",
            description: "Unable to log out.",
            variant: "destructive"
          })
    }
    setEmail("")
    setPassword("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{isLoggedIn ? "Welcome" : "Sign Up / Login"}</CardTitle>
            <CardDescription>
              {isLoggedIn ? "You are logged in" : "Enter your details to sign up or log in"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isLoggedIn ? (
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={emailInput}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={passwordInput}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* <Button type="submit">Sign Up / Login</Button> */}
              </form>
            ) : (
              <p>You are logged in as {email}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isLoggedIn ? (
              <Button type="submit" onClick={handleSubmit}>Sign Up / Login</Button>
            ) : (
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoggedIn ? (
              <div className="space-y-2">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Password:</strong> {"*".repeat(password.length)}</p>
              </div>
            ) : (
              <p>Please log in to view account information.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <AuthTokenManagerComponent/>
    </div>
  )
}
