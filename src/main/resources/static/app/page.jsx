import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, HandHelping, MessageSquare, Users, Star } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Jane! Here's what's happening in your neighborhood.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <HandHelping className="mr-2 h-4 w-4" />
            Request Help
          </Button>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="volunteering">Volunteering</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="requests" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Active Requests */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Active Requests</CardTitle>
                  <CardDescription>Help you've requested from neighbors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RequestCard
                    title="Grocery Delivery"
                    description="Need help picking up groceries from Whole Foods"
                    date="Tomorrow, 2:00 PM"
                    status="Matched"
                    volunteer="John Smith"
                  />
                  <RequestCard
                    title="Lawn Mowing"
                    description="Looking for help with mowing my front lawn"
                    date="Saturday, 10:00 AM"
                    status="Pending"
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </CardFooter>
              </Card>

              {/* Upcoming Help */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Help</CardTitle>
                  <CardDescription>Scheduled assistance from volunteers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <UpcomingCard
                    title="Grocery Delivery"
                    volunteer="John Smith"
                    date="Tomorrow, 2:00 PM"
                    status="Confirmed"
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates on your requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ActivityCard
                    title="New message from John"
                    description="Regarding your grocery delivery request"
                    time="2 hours ago"
                    icon={<MessageSquare className="h-4 w-4" />}
                  />
                  <ActivityCard
                    title="Request completed"
                    description="Dog walking with Sarah"
                    time="Yesterday"
                    icon={<HandHelping className="h-4 w-4" />}
                  />
                  <ActivityCard
                    title="New volunteer match"
                    description="John Smith for grocery delivery"
                    time="Yesterday"
                    icon={<Users className="h-4 w-4" />}
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="volunteering" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>My Volunteer Tasks</CardTitle>
                  <CardDescription>Help you've offered to neighbors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RequestCard
                    title="Grocery Shopping"
                    description="Help Mary with her weekly grocery shopping"
                    date="Friday, 3:00 PM"
                    status="Confirmed"
                    volunteer="You"
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Tasks
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Available Opportunities</CardTitle>
                  <CardDescription>Neighbors who need your help</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RequestCard
                    title="Tech Support"
                    description="Help setting up a new laptop and printer"
                    date="Saturday, 11:00 AM"
                    status="Needs Volunteer"
                    requester="Robert Chen"
                  />
                  <RequestCard
                    title="Furniture Assembly"
                    description="Need help assembling a bookshelf"
                    date="Sunday, 2:00 PM"
                    status="Needs Volunteer"
                    requester="Lisa Johnson"
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Find More Opportunities
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Impact Stats</CardTitle>
                  <CardDescription>Your contribution to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Neighbors Helped</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Hours Given</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">4.9</p>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Stats
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Community Stats</CardTitle>
                  <CardDescription>Activity in your neighborhood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">87</p>
                      <p className="text-sm text-muted-foreground">Active Neighbors</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">42</p>
                      <p className="text-sm text-muted-foreground">Open Requests</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-4">
                      <p className="text-3xl font-bold">35</p>
                      <p className="text-sm text-muted-foreground">Active Volunteers</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Community Page
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Top Volunteers</CardTitle>
                  <CardDescription>Most active helpers in your area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <VolunteerCard name="Sarah Johnson" tasks={24} rating={4.9} />
                  <VolunteerCard name="Michael Chen" tasks={18} rating={4.8} />
                  <VolunteerCard name="Emily Rodriguez" tasks={15} rating={4.7} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Volunteers
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Community gatherings and activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EventCard
                    title="Neighborhood Cleanup"
                    description="Join us to clean up the local park"
                    date="This Saturday, 9:00 AM"
                    location="Maple Street Park"
                  />
                  <EventCard
                    title="Volunteer Training"
                    description="Learn how to be an effective volunteer"
                    date="Next Tuesday, 6:00 PM"
                    location="Community Center"
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function RequestCard({ title, description, date, status, volunteer, requester }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex justify-between">
        <h3 className="font-medium">{title}</h3>
        <Badge
          variant={
            status === "Pending" || status === "Needs Volunteer"
              ? "outline"
              : status === "Matched" || status === "Confirmed"
                ? "default"
                : "secondary"
          }
        >
          {status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="flex items-center mt-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3 mr-1" />
        <span>{date}</span>
      </div>
      {volunteer && (
        <div className="flex items-center mt-2 text-xs">
          <Users className="h-3 w-3 mr-1" />
          <span>Volunteer: {volunteer}</span>
        </div>
      )}
      {requester && (
        <div className="flex items-center mt-2 text-xs">
          <Users className="h-3 w-3 mr-1" />
          <span>Requested by: {requester}</span>
        </div>
      )}
    </div>
  )
}

function UpcomingCard({ title, volunteer, date, status }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex justify-between">
        <h3 className="font-medium">{title}</h3>
        <Badge variant={status === "Confirmed" ? "default" : "outline"}>{status}</Badge>
      </div>
      <div className="flex items-center mt-2 text-xs">
        <Users className="h-3 w-3 mr-1" />
        <span>Volunteer: {volunteer}</span>
      </div>
      <div className="flex items-center mt-2 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{date}</span>
      </div>
    </div>
  )
}

function ActivityCard({ title, description, time, icon }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-start">
        <div className="mr-2 mt-0.5 rounded-full bg-primary/10 p-1 text-primary">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
      </div>
    </div>
  )
}

function VolunteerCard({ name, tasks, rating }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{tasks} tasks completed</p>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="h-3 w-3 fill-primary text-primary mr-1" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
    </div>
  )
}

function EventCard({ title, description, date, location }) {
  return (
    <div className="rounded-lg border p-3">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="flex items-center mt-2 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{date}</span>
      </div>
      <div className="flex items-center mt-1 text-xs text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{location}</span>
      </div>
    </div>
  )
}

function Avatar({ className, children }) {
  return <div className={`relative inline-block ${className}`}>{children}</div>
}

function AvatarImage({ src, alt }) {
  return <img src={src || "/placeholder.svg"} alt={alt} className="h-full w-full rounded-full object-cover" />
}

function AvatarFallback({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
      {children}
    </div>
  )
}
