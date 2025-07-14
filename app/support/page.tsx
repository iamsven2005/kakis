import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, HelpCircle } from "lucide-react"

const faqItems = [
  {
    question: "How do I place an order?",
    answer:
      "Browse available food stalls on the homepage, select a stall, add items to your cart, and proceed to checkout. You can choose between delivery or pickup options.",
  },
  {
    question: "What are the delivery fees?",
    answer: "Delivery by student partners costs $2.00. Self pickup is free. Minimum order value is $10 for all orders.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Typical delivery time is 15-30 minutes depending on the stall and your location on campus. You'll see estimated times when browsing stalls.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! Once you place an order, you can track its status in real-time from 'My Orders' page. You'll see when it's being prepared, picked up, and delivered.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept online payments (PayNow, Credit Cards) and cash on delivery. Payment is processed securely through our platform.",
  },
  {
    question: "How do I become a delivery partner?",
    answer:
      "Students can apply to become delivery partners through our partner registration page. You'll need to provide your student ID and contact information.",
  },
  {
    question: "What if my order is wrong or missing items?",
    answer:
      "Contact our support team immediately through this page or call our hotline. We'll work with the food stall to resolve the issue quickly.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within 5 minutes of placing them if they haven't been picked up by a partner yet. Contact support for assistance.",
  },
]

export default function SupportPage() {
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
            <div>
              <h1 className="text-xl font-bold">Support Center</h1>
              <p className="text-sm text-muted-foreground">We're here to help</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Quick Contact</span>
                </CardTitle>
                <CardDescription>Get help fast through these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-muted-foreground">+65 6123 4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 8AM-8PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">help@kakis.com</p>
                    <p className="text-xs text-muted-foreground">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                    <Button size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Support Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-xs text-muted-foreground">Emergency support available 24/7 through live chat</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Describe your issue and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@school.edu" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-id">Order ID (if applicable)</Label>
                  <Input id="order-id" placeholder="e.g., ORD-001" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Please describe your issue in detail..." className="min-h-32" />
                </div>

                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Contact</CardTitle>
                <CardDescription className="text-red-700">
                  For urgent issues during delivery or food safety concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Emergency Hotline</p>
                    <p className="text-red-700">+65 9999 0000</p>
                    <p className="text-xs text-red-600">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
