"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loginType, setLoginType] = useState("student")

  const handleEmailLogin = () => {
    // In real app, this would authenticate with backend
    alert("Login successful! Redirecting...")
  }

  const handleSendOTP = () => {
    if (phone) {
      setOtpSent(true)
      alert(`OTP sent to ${phone}`)
    }
  }

  const handleOTPLogin = () => {
    if (otp) {
      alert("OTP verified! Login successful!")
    }
  }

  const handleGoogleLogin = () => {
    // In real app, this would integrate with Google OAuth
    alert("Google login would be implemented here")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <CardTitle className="text-2xl">Welcome to Kakis</CardTitle>
            <CardDescription>Sign in to your account to start ordering delicious food</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={loginType} onValueChange={setLoginType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="partner">Partner</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <div className="space-y-4">
                  {/* Google Login */}
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  {/* Email Login */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleEmailLogin}>
                    <Mail className="w-4 h-4 mr-2" />
                    Sign in with Email
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  {/* Phone/OTP Login */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+65 9123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={otpSent}
                    />
                  </div>

                  {!otpSent ? (
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleSendOTP}>
                      <Phone className="w-4 h-4 mr-2" />
                      Send OTP
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} />
                      <Button className="w-full" onClick={handleOTPLogin}>
                        Verify OTP
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full" onClick={() => setOtpSent(false)}>
                        Use different number
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="partner" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="partner-email">Partner Email</Label>
                    <Input id="partner-email" type="email" placeholder="partner@school.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-password">Password</Label>
                    <Input id="partner-password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full">Sign in as Partner</Button>
                  <div className="text-center">
                    <Link href="/partner/register" className="text-sm text-primary hover:underline">
                      Want to become a delivery partner?
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" placeholder="admin@kakis.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full">Sign in as Admin</Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
