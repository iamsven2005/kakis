"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, CreditCard, Wallet } from "lucide-react"

export default function CheckoutPage() {
  const [deliveryOption, setDeliveryOption] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  // Mock cart data - in real app, this would come from context/state
  const cartItems = [
    { id: 1, name: "Chicken Fried Rice", price: 8.5, quantity: 2 },
    { id: 2, name: "Beef Noodle Soup", price: 9.8, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = deliveryOption === "delivery" ? 2.0 : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = () => {
    // In real app, this would process the order
    alert("Order placed successfully! Redirecting to order tracking...")
    // Redirect to order tracking page
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/menu/1">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Delivery Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Delivery by Student Partner</p>
                          <p className="text-sm text-muted-foreground">15-25 minutes</p>
                        </div>
                        <Badge>$2.00</Badge>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Self Pick-up</p>
                          <p className="text-sm text-muted-foreground">Ready in 10-15 minutes</p>
                        </div>
                        <Badge variant="secondary">Free</Badge>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {deliveryOption === "delivery" && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your location (e.g., Block A, Level 3, Room 301)"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Wallet className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Online Payment</p>
                          <p className="text-sm text-muted-foreground">PayNow, Credit Card</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                          <span className="text-green-600 text-xs font-bold">$</span>
                        </div>
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Special Instructions</CardTitle>
                <CardDescription>Any special requests for your order or delivery?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Extra spicy, No onions, Call when arrived..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Kakis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {total < 10 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Minimum order is $10.00. Add ${(10 - total).toFixed(2)} more to proceed.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estimated Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Estimated Time</p>
                    <p className="text-sm text-muted-foreground">
                      {deliveryOption === "delivery" ? "20-30 minutes" : "10-15 minutes"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={total < 10 || (deliveryOption === "delivery" && !deliveryAddress)}
            >
              Place Order • ${total.toFixed(2)}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
