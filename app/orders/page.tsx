"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    stallName: "Asian Delights",
    items: ["Chicken Fried Rice x2", "Beef Noodle Soup x1"],
    total: 26.8,
    status: "delivered",
    orderTime: "2024-01-15 12:30 PM",
    deliveryTime: "2024-01-15 12:55 PM",
    deliveryAddress: "Block A, Level 3, Room 301",
    partnerName: "John Doe",
    partnerPhone: "+65 9123 4567",
  },
  {
    id: "ORD-002",
    stallName: "Western Grill",
    items: ["Beef Burger x1", "Chicken Wings x1"],
    total: 18.5,
    status: "picked_up",
    orderTime: "2024-01-15 01:15 PM",
    deliveryTime: null,
    deliveryAddress: "Block B, Level 2, Room 205",
    partnerName: "Sarah Lee",
    partnerPhone: "+65 9876 5432",
  },
  {
    id: "ORD-003",
    stallName: "Healthy Bowls",
    items: ["Quinoa Bowl x1", "Green Smoothie x1"],
    total: 15.8,
    status: "preparing",
    orderTime: "2024-01-15 02:00 PM",
    deliveryTime: null,
    deliveryAddress: "Block C, Level 1, Room 101",
    partnerName: null,
    partnerPhone: null,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "preparing":
      return "bg-yellow-100 text-yellow-800"
    case "picked_up":
      return "bg-blue-100 text-blue-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "preparing":
      return "Preparing"
    case "picked_up":
      return "Out for Delivery"
    case "delivered":
      return "Delivered"
    default:
      return "Unknown"
  }
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Orders</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              When you place your first order with Kakis, it will appear here.
            </p>
            <Link href="/">
              <Button>Browse Food Stalls</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.stallName}</CardTitle>
                      <CardDescription>Order #{order.id}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Items Ordered</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Ordered: {order.orderTime}</span>
                      </div>
                      {order.deliveryTime && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span>Delivered: {order.deliveryTime}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                    </div>

                    {order.partnerName && (
                      <div className="space-y-2">
                        <p>
                          <strong>Delivery Partner:</strong> {order.partnerName}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{order.partnerPhone}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="font-medium">Total Paid</span>
                    <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {order.status !== "delivered" && (
                      <Link href={`/orders/${order.id}/track`}>
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Rate & Review
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
