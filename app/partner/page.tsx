"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, DollarSign, Package, CheckCircle } from "lucide-react"

const availableOrders = [
  {
    id: "ORD-004",
    stallName: "Asian Delights",
    customerName: "Alice Wong",
    items: ["Chicken Fried Rice x1", "Spring Rolls x2"],
    total: 14.5,
    deliveryFee: 2.0,
    pickupLocation: "Food Court Level 1",
    deliveryLocation: "Block A, Level 3, Room 301",
    estimatedTime: "15 mins",
    distance: "0.3 km",
  },
  {
    id: "ORD-005",
    stallName: "Western Grill",
    customerName: "Bob Chen",
    items: ["Beef Burger x2", "Fries x1"],
    total: 22.8,
    deliveryFee: 2.0,
    pickupLocation: "Food Court Level 1",
    deliveryLocation: "Block B, Level 2, Room 205",
    estimatedTime: "20 mins",
    distance: "0.5 km",
  },
]

const myDeliveries = [
  {
    id: "ORD-002",
    stallName: "Western Grill",
    customerName: "Sarah Lee",
    items: ["Beef Burger x1", "Chicken Wings x1"],
    total: 18.5,
    deliveryFee: 2.0,
    status: "picked_up",
    pickupLocation: "Food Court Level 1",
    deliveryLocation: "Block B, Level 2, Room 205",
    customerPhone: "+65 9876 5432",
  },
]

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState("available")

  const acceptOrder = (orderId: string) => {
    alert(`Order ${orderId} accepted! You can now pick it up from the stall.`)
  }

  const markAsPickedUp = (orderId: string) => {
    alert(`Order ${orderId} marked as picked up! Now delivering to customer.`)
  }

  const markAsDelivered = (orderId: string) => {
    alert(`Order ${orderId} marked as delivered! Payment will be processed.`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Partner Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back to Kakis, John!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="font-bold text-lg text-green-600">$24.50</p>
              </div>
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <p className="font-bold text-xl">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="font-bold text-xl">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Today's Earnings</p>
                  <p className="font-bold text-xl">$24.50</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Delivery</p>
                  <p className="font-bold text-xl">18 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Orders ({availableOrders.length})</TabsTrigger>
            <TabsTrigger value="my-deliveries">My Deliveries ({myDeliveries.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {availableOrders.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No available orders</h3>
                  <p className="text-muted-foreground">New delivery requests will appear here when available.</p>
                </CardContent>
              </Card>
            ) : (
              availableOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.stallName}</CardTitle>
                        <CardDescription>
                          Order #{order.id} • {order.customerName}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">+${order.deliveryFee.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Delivery fee</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-2">Items</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">Pick up from</p>
                            <p className="text-muted-foreground">{order.pickupLocation}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="font-medium">Deliver to</p>
                            <p className="text-muted-foreground">{order.deliveryLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex items-center justify-between text-sm bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{order.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{order.distance}</span>
                        </div>
                      </div>
                      <p>
                        <strong>Order Total:</strong> ${order.total.toFixed(2)}
                      </p>
                    </div>

                    <Button className="w-full" onClick={() => acceptOrder(order.id)}>
                      Accept Delivery (+${order.deliveryFee.toFixed(2)})
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="my-deliveries" className="space-y-4">
            {myDeliveries.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No active deliveries</h3>
                  <p className="text-muted-foreground">Your accepted orders will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              myDeliveries.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.stallName}</CardTitle>
                        <CardDescription>
                          Order #{order.id} • {order.customerName}
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          order.status === "picked_up" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.status === "picked_up" ? "Out for Delivery" : "Ready for Pickup"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-2">Items</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Customer Contact */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-sm">Customer Contact</p>
                      <p className="text-sm">{order.customerPhone}</p>
                    </div>

                    {/* Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">Pick up from</p>
                            <p className="text-muted-foreground">{order.pickupLocation}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="font-medium">Deliver to</p>
                            <p className="text-muted-foreground">{order.deliveryLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {order.status !== "picked_up" ? (
                        <Button className="flex-1" onClick={() => markAsPickedUp(order.id)}>
                          Mark as Picked Up
                        </Button>
                      ) : (
                        <Button className="flex-1" onClick={() => markAsDelivered(order.id)}>
                          Mark as Delivered
                        </Button>
                      )}
                      <Button variant="outline">Call Customer</Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      <strong>Delivery Fee:</strong> +${order.deliveryFee.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
