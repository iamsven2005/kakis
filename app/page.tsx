import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Users } from "lucide-react"

const foodStalls = [
  {
    id: 1,
    name: "Asian Delights",
    description: "Authentic Asian cuisine with fresh ingredients",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    deliveryTime: "15-25 min",
    minOrder: 10,
    isOpen: true,
    categories: ["Asian", "Rice", "Noodles"],
  },
  {
    id: 2,
    name: "Western Grill",
    description: "Burgers, sandwiches, and grilled favorites",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    deliveryTime: "20-30 min",
    minOrder: 12,
    isOpen: true,
    categories: ["Western", "Burgers", "Grilled"],
  },
  {
    id: 3,
    name: "Healthy Bowls",
    description: "Fresh salads, smoothie bowls, and healthy options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    deliveryTime: "10-20 min",
    minOrder: 8,
    isOpen: false,
    categories: ["Healthy", "Salads", "Smoothies"],
  },
  {
    id: 4,
    name: "Local Favorites",
    description: "Traditional local dishes and comfort food",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    deliveryTime: "15-25 min",
    minOrder: 10,
    isOpen: true,
    categories: ["Local", "Traditional", "Comfort Food"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍽️</span>
              </div>
              <h1 className="text-xl font-bold">SchoolEats</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/orders">
                <Button variant="ghost">My Orders</Button>
              </Link>
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Delicious Food, Delivered Fast</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Order from your favorite school food stalls and get it delivered by fellow students. Fresh, fast, and
            convenient!
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Campus Wide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Student Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Food Stalls */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Available Food Stalls</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Open Now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foodStalls.map((stall) => (
              <Card key={stall.id} className={`hover:shadow-lg transition-shadow ${!stall.isOpen ? "opacity-60" : ""}`}>
                <div className="relative">
                  <img
                    src={stall.image || "/placeholder.svg"}
                    alt={stall.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!stall.isOpen && (
                    <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                      <Badge variant="secondary">Closed</Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white text-black">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {stall.rating}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{stall.name}</CardTitle>
                  <CardDescription>{stall.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {stall.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{stall.deliveryTime}</span>
                    </div>
                    <span>Min ${stall.minOrder}</span>
                  </div>

                  <Link href={stall.isOpen ? `/menu/${stall.id}` : "#"}>
                    <Button className="w-full" disabled={!stall.isOpen}>
                      {stall.isOpen ? "View Menu" : "Closed"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose SchoolEats?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Fast Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Get your food delivered quickly by fellow students who know the campus
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Student Partners</h4>
              <p className="text-sm text-muted-foreground">
                Support fellow students while getting your favorite meals delivered
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Campus Coverage</h4>
              <p className="text-sm text-muted-foreground">
                Delivery available across the entire campus with real-time tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white text-xs">🍽️</span>
              </div>
              <span className="font-semibold">SchoolEats</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/partner" className="hover:text-foreground">
                Become a Partner
              </Link>
              <Link href="/admin" className="hover:text-foreground">
                Admin
              </Link>
              <Link href="/support" className="hover:text-foreground">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
