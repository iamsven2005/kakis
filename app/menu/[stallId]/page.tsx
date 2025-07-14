"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, Clock } from "lucide-react"
import { useParams } from "next/navigation"

// Mock data - in real app, this would come from API
const stallData = {
  1: {
    name: "Asian Delights",
    description: "Authentic Asian cuisine with fresh ingredients",
    rating: 4.8,
    deliveryTime: "15-25 min",
    minOrder: 10,
    image: "/images/asian-delights-banner.png",
  },
}

const menuItems = [
  {
    id: 1,
    name: "Chicken Fried Rice",
    description: "Wok-fried rice with tender chicken, vegetables, and aromatic spices",
    price: 8.5,
    image: "/images/chicken-fried-rice.png",
    category: "Rice Dishes",
    popular: true,
  },
  {
    id: 2,
    name: "Beef Noodle Soup",
    description: "Rich broth with tender beef slices and fresh noodles",
    price: 9.8,
    image: "/images/beef-noodle-soup.png",
    category: "Noodles",
    popular: true,
  },
  {
    id: 3,
    name: "Sweet & Sour Pork",
    description: "Crispy pork with bell peppers in tangy sweet and sour sauce",
    price: 10.2,
    image: "/images/sweet-sour-pork.png",
    category: "Main Dishes",
  },
  {
    id: 4,
    name: "Vegetable Spring Rolls",
    description: "Crispy rolls filled with fresh vegetables, served with dipping sauce",
    price: 5.5,
    image: "/images/spring-rolls.png",
    category: "Appetizers",
  },
  {
    id: 5,
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts and vegetables",
    price: 9.5,
    image: "/images/kung-pao-chicken.png",
    category: "Main Dishes",
  },
  {
    id: 6,
    name: "Thai Green Curry",
    description: "Aromatic green curry with coconut milk and fresh herbs",
    price: 11.0,
    image: "/images/thai-green-curry.png",
    category: "Curry",
  },
]

export default function MenuPage() {
  const params = useParams()
  const stallId = params.stallId as string
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState("All")

  const stall = stallData[stallId as keyof typeof stallData]
  const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))]

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const cartTotal = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const item = menuItems.find((i) => i.id === Number.parseInt(itemId))
    return total + (item?.price || 0) * quantity
  }, 0)

  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)

  if (!stall) {
    return <div>Stall not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{stall.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{stall.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{stall.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
            {cartItemCount > 0 && (
              <Link href="/checkout">
                <Button className="relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cartItemCount})
                  <Badge className="absolute -top-2 -right-2 bg-red-500">${cartTotal.toFixed(2)}</Badge>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Stall Image */}
      <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/10 relative">
        <img src={stall.image || "/placeholder.svg"} alt={stall.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Category Filter */}
      <div className="border-b bg-white sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex">
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                      <p className="font-bold text-lg text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="ml-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center space-x-2">
                      {cart[item.id] ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{cart[item.id]}</span>
                          <Button size="icon" className="h-8 w-8" onClick={() => addToCart(item.id)}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => addToCart(item.id)}>Add to Cart</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link href="/checkout">
            <Button size="lg" className="rounded-full shadow-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              {cartItemCount} items • ${cartTotal.toFixed(2)}
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
