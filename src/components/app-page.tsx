'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">JWT vs PASETO: Understanding the Differences</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>JWT (JSON Web Token)</CardTitle>
            <CardDescription>A widely used standard for creating tokens that assert claims.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p>JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.</p>
              </TabsContent>
              <TabsContent value="functions">
                <ul className="list-disc pl-6">
                  <li>sign: Creates a JWT</li>
                  <li>verify: Verifies the integrity of the JWT</li>
                </ul>
              </TabsContent>
              <TabsContent value="code">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`
const jwt = require('jsonwebtoken');

// Signing
const token = jwt.sign({ userId: 123 }, 'secret');

// Verifying
const decoded = jwt.verify(token, 'secret');
                  `}</code>
                </pre>
              </TabsContent>
            </Tabs>
            <Link href="https://www.npmjs.com/package/jsonwebtoken" className="text-primary hover:underline mt-4 inline-block" target="_blank" rel="noopener noreferrer">
              npm: jsonwebtoken
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>PASETO (Platform-Agnostic Security Tokens)</CardTitle>
            <CardDescription>A more secure alternative to JWT, designed to be resistant to implementation errors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p>PASETO is a specification for secure stateless tokens. Unlike JWT, PASETO has no options. It&apos;s an opinionated solution to JWT&apos;s design issues, using modern cryptography principles to secure tokens.</p>
              </TabsContent>
              <TabsContent value="functions">
                <ul className="list-disc pl-6">
                  <li>sign: Creates a signed PASETO token</li>
                  <li>verify: Verifies a signed PASETO token</li>
                  <li>encrypt: Creates an encrypted PASETO token</li>
                  <li>decrypt: Decrypts an encrypted PASETO token</li>
                </ul>
              </TabsContent>
              <TabsContent value="code">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`
const paseto = require('paseto');

// Signing
const token = await paseto.sign({ userId: 123 }, secretKey);

// Verifying
const payload = await paseto.verify(token, secretKey);

// Encrypting
const encrypted = await paseto.encrypt({ userId: 123 }, secretKey);

// Decrypting
const decrypted = await paseto.decrypt(encrypted, secretKey);
                  `}</code>
                </pre>
              </TabsContent>
            </Tabs>
            <Link href="https://www.npmjs.com/package/paseto" className="text-primary hover:underline mt-4 inline-block" target="_blank" rel="noopener noreferrer">
              npm: paseto
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Key Differences</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>PASETO provides both symmetric and asymmetric encryption, while JWT only offers signing.</li>
            <li>PASETO has a simpler API, reducing the risk of implementation errors.</li>
            <li>PASETO uses modern cryptographic primitives (e.g., XChaCha20-Poly1305 for encryption) and is designed to be more resistant to known vulnerabilities.</li>
            <li>JWT has wider adoption and more extensive ecosystem support.</li>
            <li>PASETO tokens are slightly larger than JWTs due to additional security features.</li>
            <li>PASETO enforces a specific set of cryptographic algorithms, while JWT allows choosing from multiple options, which can lead to potential security issues if weak algorithms are selected.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}