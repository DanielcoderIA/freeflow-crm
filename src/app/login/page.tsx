'use client';

import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const demo = searchParams.get("demo");
    if (demo === "true") {
      setIsDemoMode(true);
      performDemoLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const validateForm = () => {
    if (!email || !email.includes("@")) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return false;
    }
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    return true;
  };

  const translateError = (message: string) => {
    if (message.includes("Invalid login credentials")) return "Credenciales inválidas. Revisa tu email y contraseña.";
    if (message.includes("Email not confirmed")) return "Email no confirmado. Por favor, revisa tu bandeja de entrada.";
    if (message.includes("User already registered")) return "Este correo ya está registrado.";
    return `Error: ${message}`;
  };

  const performDemoLogin = async () => {
    setLoading(true);
    setError(null);
    toast.info("Accediendo como Invitado...");
    
    try {
      // Fallback a credenciales conocidas si las variables de entorno fallan en el cliente
      const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@test.com";
      const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "Demo1234";

      const { error } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });

      if (error) {
        const translated = translateError(error.message);
        setError(translated);
        toast.error(translated);
        setLoading(false);
        setIsDemoMode(false);
      } else {
        sessionStorage.setItem("demo_welcome", "true");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e: any) {
      console.error("Demo login crash:", e);
      toast.error("Error crítico al intentar acceder en modo demo.");
      setLoading(false);
      setIsDemoMode(false);
    }
  };




  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        const translated = translateError(error.message);
        setError(translated);
        toast.error(translated);
      } else {
        toast.success("¡Bienvenido de nuevo!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e: any) {
      setLoading(false);
      toast.error("Error inesperado de red.");
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      setLoading(false);
      if (error) {
        const translated = translateError(error.message);
        setError(translated);
        toast.error(translated);
      } else {
        const msg = "Revisa tu email para el enlace de confirmación.";
        setError(msg);
        toast.success(msg);
      }
    } catch (e: any) {
      setLoading(false);
      toast.error("Error inesperado en el registro.");
    }
  };


  if (isDemoMode) {
    return (
      <Card className="w-full max-w-sm flex flex-col items-center justify-center py-12 shadow-md">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-sm font-medium animate-pulse">Accediendo como Reclutador...</p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm border-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" className="w-full" onClick={handleSignUp} disabled={loading}>
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Suspense fallback={
        <Card className="w-full max-w-sm flex flex-col items-center justify-center py-12 shadow-md">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground text-sm font-medium">Cargando...</p>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
