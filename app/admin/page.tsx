"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Package, Users, TrendingUp, Search } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "Alice Wong",
    stall: "Asian Delights",
    items: 3,
    total: 26.8,
    status: "delivered",
    partner: "John Doe",
    orderTime: "12:30 PM",
    deliveryTime: "12:55 PM",
  },
  {
    id: "ORD-002",
    customer: "Bob Chen",
    stall: "Western Grill",
    items: 2,
    total: 18.5,
    status: "picked_up",
    partner: "Sarah Lee",
    orderTime: "01:15 PM",
    deliveryTime: null,
  },
  {
    id: "ORD-003",
    customer: "Carol Tan",
    stall: "Healthy Bowls",
    items: 2,
    total: 15.8,
    status: "preparing",
    partner: null,
    orderTime: "02:00 PM",
    deliveryTime: null,
  },
]

const partners = [
  {
    id: "P001",
    name: "John Doe",
    phone: "+65 9123 4567",
    status: "active",
    todayDeliveries: 8,
    todayEarnings: 24.5,
    rating: 4.8,
    joinDate: "2024-01-01",
  },
  {
    id: "P002",
    name: "Sarah Lee",
    phone: "+65 9876 5432",
    status: "active",
    todayDeliveries: 6,
    todayEarnings: 18.0,
    rating: 4.9,
    joinDate: "2024-01-05",
  },
  {
    id: "P003",
    name: "Mike Wilson",
    phone: "+65 8765 4321",
    status: "offline",
    todayDeliveries: 0,
    todayEarnings: 0,
    rating: 4.7,
    joinDate: "2024-01-10",
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

const getPartnerStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "offline":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const assignPartner = (orderId: string, partnerId: string) => {
    alert(`Order ${orderId} assigned to partner ${partnerId}`)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Kakis Management Portal</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Settings</Button>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Orders</p>
                      <p className="font-bold text-2xl">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Revenue</p>
                      <p className="font-bold text-2xl">$486.50</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Partners</p>
                      <p className="font-bold text-2xl">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
                      <p className="font-bold text-2xl">18 min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from all food stalls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">#{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm">{order.stall}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search orders by ID or customer name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="picked_up">Picked Up</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Manage and track all orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Stall</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.stall}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                        </TableCell>
                        <TableCell>{order.partner || "Unassigned"}</TableCell>
                        <TableCell>{order.orderTime}</TableCell>
                        <TableCell>
                          {!order.partner && order.status === "preparing" && (
                            <Select onValueChange={(partnerId) => assignPartner(order.id, partnerId)}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Assign" />
                              </SelectTrigger>
                              <SelectContent>
                                {partners
                                  .filter((p) => p.status === "active")
                                  .map((partner) => (
                                    <SelectItem key={partner.id} value={partner.id}>
                                      {partner.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            {/* Partners Table */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Partners</CardTitle>
                <CardDescription>Manage student delivery partners</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Today's Deliveries</TableHead>
                      <TableHead>Today's Earnings</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.id}</TableCell>
                        <TableCell>{partner.name}</TableCell>
                        <TableCell>{partner.phone}</TableCell>
                        <TableCell>
                          <Badge className={getPartnerStatusColor(partner.status)}>{partner.status}</Badge>
                        </TableCell>
                        <TableCell>{partner.todayDeliveries}</TableCell>
                        <TableCell>${partner.todayEarnings.toFixed(2)}</TableCell>
                        <TableCell>⭐ {partner.rating}</TableCell>
                        <TableCell>{partner.joinDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$3,420.50</div>
                  <p className="text-sm text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Popular Stalls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Asian Delights</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Western Grill</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Healthy Bowls</span>
                      <span className="font-medium">23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>12:00 - 13:00</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>18:00 - 19:00</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>19:00 - 20:00</span>
                      <span className="font-medium">22%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
