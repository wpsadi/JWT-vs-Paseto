"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { useAuthStore } from "@/store/authStore"
import { useToast } from "@/hooks/use-toast"

export function AuthTokenManagerComponent() {
  const { toast } = useToast()
  const { isLoggedIn, email, logout } = useAuthStore()
  const [tokenType, setTokenType] = useState<"JWT" | "PASETO">("JWT")
  const [payload, setPayload] = useState("")
  const [algorithm, setAlgorithm] = useState("HS256")
  const [secret, setSecret] = useState("")
  const [generatedToken, setGeneratedToken] = useState("")
  const [decodedPayload, setDecodedPayload] = useState("")

  if (!isLoggedIn) {
    return null
  }

  const handleGenerateToken = () => {
    // This is a placeholder. In a real application, you would use a library to generate the token.
    setGeneratedToken(`${tokenType}.${btoa(payload)}.${btoa(secret)}`)
    toast({
      title: "Token Generated",
      description: "Your token has been successfully generated.",
    })
  }

  const handleDecryptToken = () => {
    // This is a placeholder. In a real application, you would use a library to decrypt the token.
    const parts = generatedToken.split('.')
    if (parts.length === 3) {
      setDecodedPayload(atob(parts[1]))
      toast({
        title: "Token Decrypted",
        description: "Your token has been successfully decrypted.",
      })
    } else {
      toast({
        title: "Decryption Failed",
        description: "Invalid token format.",
        variant: "destructive",
      })
    }
  }

  const handleVerifyToken = () => {
    // This is a placeholder. In a real application, you would use a library to verify the token.
    toast({
      title: "Token Verified",
      description: "Your token is valid.",
    })
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken)
    toast({
      title: "Token Copied",
      description: "The token has been copied to your clipboard.",
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Authentication Token Manager</CardTitle>
        <CardDescription>Manage your JWT or PASETO tokens</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p>Logged in as: {email}</p>
          </div>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="token-type">Token Type:</Label>
          <Switch
            id="token-type"
            checked={tokenType === "PASETO"}
            onCheckedChange={(checked) => setTokenType(checked ? "PASETO" : "JWT")}
          />
          <span>{tokenType}</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payload">Payload:</Label>
          <Textarea
            id="payload"
            placeholder="Enter your payload JSON here"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="algorithm">Encryption Algorithm:</Label>
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger id="algorithm">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HS256">HS256 (JWT)</SelectItem>
              <SelectItem value="RS256">RS256 (JWT)</SelectItem>
              <SelectItem value="v2.local">v2.local (PASETO)</SelectItem>
              <SelectItem value="v2.public">v2.public (PASETO)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secret">Secret/Key:</Label>
          <Input
            id="secret"
            type="password"
            placeholder="Enter your secret or key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleGenerateToken}>Generate Token</Button>
          <Button onClick={handleDecryptToken}>Decrypt Token</Button>
          <Button onClick={handleVerifyToken}>Verify Token</Button>
          <Button onClick={handleCopyToken}>Copy Token</Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="generated-token">Generated Token:</Label>
          <Textarea
            id="generated-token"
            value={generatedToken}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="decoded-payload">Decoded Payload:</Label>
          <Textarea
            id="decoded-payload"
            value={decodedPayload}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  )
}