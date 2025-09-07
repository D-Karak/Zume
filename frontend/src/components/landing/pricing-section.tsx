import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "../ui/badge"
import { Check } from "lucide-react"

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Get a feel for how it works. No payment required.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Standard",
      price: "250 rs.",
      description: "Access to all features plus unlimited AI Credits & free templates.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Premium",
      price: "5000 rs.",
      description: "Access to all features with a one-time payment.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
      <div  className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose from the most popular plans</h2>
          <p className="text-lg text-gray-600">Select the perfect plan that fits your needs and budget</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
  key={index}
  className={`relative bg-white text-gray-900 ${plan.popular ? "border-teal-500 shadow-lg scale-105" : "border-gray-200"} transition-all hover:shadow-lg`}
>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-teal-500 text-white px-4 py-1 border-none">
  Popular
</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mb-2">
<span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{plan.name}</span>
                </div>
                <div className="mb-4">
<span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                </div>
<p className="text-sm text-gray-600 px-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
  <Check className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0" />
  {feature}
</li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${plan.popular ? "bg-teal-500 hover:bg-teal-600 text-white" : "dark:border-accent/10 hover:dark:bg-accent/10 hover:dark:text-black"}`}
                >
                  {plan.buttonText}
                </Button>

                {plan.popular && <p className="text-xs text-center text-gray-500 mt-3">30% better than other plans</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
