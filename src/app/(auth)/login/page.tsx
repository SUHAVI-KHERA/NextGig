
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Logo />
        </div>
        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="font-headline">Client Portal</CardTitle>
                <CardDescription>Login or create an account to hire talent.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input id="client-email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-password">Password</Label>
                  <Input id="client-password" type="password" />
                </div>
                 <Button asChild className="w-full">
                  <Link href="/dashboard">Login / Sign Up</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="freelancer">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="font-headline">Freelancer Portal</CardTitle>
                <CardDescription>Login or create an account to find work.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="freelancer-email">Email</Label>
                  <Input id="freelancer-email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freelancer-password">Password</Label>
                  <Input id="freelancer-password" type="password" />
                </div>
                <Button asChild className="w-full">
                  <Link href="/dashboard">Login / Sign Up</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
         <div className="mt-4 text-center text-sm">
            <Link href="/dashboard" className="underline text-muted-foreground">
                Continue as guest
            </Link>
        </div>
      </div>
    </div>
  );
}
