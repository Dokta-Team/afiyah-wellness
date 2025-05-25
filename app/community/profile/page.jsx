"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Shield, CreditCard } from "lucide-react"

export default function MemberProfile() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
    membershipType: "free",
    joinedAt: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/user/profile")

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          profileImage: profile.profileImage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="text-center py-12">Loading profile...</div>
      </div>
    )
  }

  return (
    <main className="container px-4 py-8 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="membership" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Membership</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.profileImage || "/placeholder.svg?height=80&width=80"} />
                    <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="profileImage">Profile Image URL</Label>
                    <Input
                      id="profileImage"
                      name="profileImage"
                      value={profile.profileImage || ""}
                      onChange={handleChange}
                      placeholder="https://example.com/your-image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={profile.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={profile.email} disabled />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio || ""}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <div>{new Date(profile.joinedAt).toLocaleDateString()}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <div className="flex gap-2">
                  <Input id="password" type="password" placeholder="New password" />
                  <Button variant="outline">Update</Button>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Notification Preferences</h3>
                <div className="space-y-2">
                  {/* Notification preferences would go here */}
                  <p className="text-sm text-muted-foreground">Notification settings coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle>Membership Status</CardTitle>
              <CardDescription>Your current membership plan and benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 dark:bg-emerald-900 p-4 rounded-lg">
                <h3 className="font-medium text-lg capitalize mb-2">{profile.membershipType} Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {profile.membershipType === "free"
                    ? "Basic access to community features"
                    : profile.membershipType === "premium"
                      ? "Full access to premium content and features"
                      : "VIP access to all content and exclusive events"}
                </p>
                {profile.membershipType === "free" && (
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Upgrade Membership</Button>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Your Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-800 p-1 rounded-full mr-2">✓</span>
                    <span>Access to community forums</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-800 p-1 rounded-full mr-2">✓</span>
                    <span>Join wellness challenges</span>
                  </li>
                  {profile.membershipType !== "free" && (
                    <>
                      <li className="flex items-start">
                        <span className="bg-emerald-100 text-emerald-800 p-1 rounded-full mr-2">✓</span>
                        <span>Exclusive content access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-emerald-100 text-emerald-800 p-1 rounded-full mr-2">✓</span>
                        <span>Priority support</span>
                      </li>
                    </>
                  )}
                  {profile.membershipType === "founder" && (
                    <li className="flex items-start">
                      <span className="bg-emerald-100 text-emerald-800 p-1 rounded-full mr-2">✓</span>
                      <span>VIP event invitations</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {profile.membershipType === "free" ? (
                <div className="text-center py-4">
                  <p className="mb-4">You are currently on the free plan with no billing information.</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Upgrade to Premium</Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="flex items-center p-3 border rounded-md">
                      <div className="mr-4">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Update
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Billing History</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="px-4 py-2 text-sm">Aug 1, 2023</td>
                            <td className="px-4 py-2 text-sm">$9.00</td>
                            <td className="px-4 py-2 text-sm">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Paid</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm">Jul 1, 2023</td>
                            <td className="px-4 py-2 text-sm">$9.00</td>
                            <td className="px-4 py-2 text-sm">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Paid</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
