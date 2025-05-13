import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Info } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function RequestHelpPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Help</h1>
          <p className="text-muted-foreground">Fill out the form below to request assistance from a neighbor.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>Provide information about the help you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title</Label>
                  <Input id="title" placeholder="E.g., Grocery Shopping, Lawn Mowing, etc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="errands">Errands & Shopping</SelectItem>
                      <SelectItem value="yardwork">Yard Work</SelectItem>
                      <SelectItem value="housework">Housework</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="tech">Tech Support</SelectItem>
                      <SelectItem value="petcare">Pet Care</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe what you need help with in detail..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>When do you need help?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-xs">
                        Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Pick a date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-xs">
                        Time
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                          <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Urgency</Label>
                  <RadioGroup defaultValue="normal">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="urgency-low" />
                      <Label htmlFor="urgency-low">Low - Within the next week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="urgency-normal" />
                      <Label htmlFor="urgency-normal">Normal - Within the next few days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="urgency-high" />
                      <Label htmlFor="urgency-high">High - As soon as possible</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Estimated Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">Less than 30 minutes</SelectItem>
                      <SelectItem value="1hour">30 minutes - 1 hour</SelectItem>
                      <SelectItem value="2hours">1 - 2 hours</SelectItem>
                      <SelectItem value="3hours">2 - 3 hours</SelectItem>
                      <SelectItem value="4hours">More than 3 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Where will this help be needed?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="use-profile-address" />
                  <Label htmlFor="use-profile-address">Use my profile address</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="ZIP Code" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location-notes">Location Notes</Label>
                  <Textarea id="location-notes" placeholder="Any special instructions for finding your location..." />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Preferences</CardTitle>
                <CardDescription>Specify any preferences for who helps you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Volunteer Requirements</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="has-car" />
                      <Label htmlFor="has-car">Must have a car</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="has-experience" />
                      <Label htmlFor="has-experience">Has experience with this task</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="background-check" />
                      <Label htmlFor="background-check">Has completed background check</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Preferred Volunteers</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="No preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No preference</SelectItem>
                      <SelectItem value="previous">Previous volunteers only</SelectItem>
                      <SelectItem value="specific">Specific volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Any other details that might help volunteers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="special-instructions">Special Instructions</Label>
                  <Textarea
                    id="special-instructions"
                    placeholder="Any other information that might be helpful..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="rounded-lg bg-muted p-4 flex items-start space-x-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Privacy Note</p>
                    <p className="text-muted-foreground">
                      Your request will be visible to verified volunteers in your neighborhood. Personal information
                      like your full address will only be shared with the volunteer who accepts your request.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">Submit Request</Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
